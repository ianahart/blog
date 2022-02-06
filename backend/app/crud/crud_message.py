from typing import Optional, Dict
from fastapi.param_functions import Header
from sqlalchemy.orm import joinedload
from app.models import Message
from sqlalchemy import select, delete, func, update
from sqlalchemy.orm.session import Session
from app.crud.base import CRUDBase
from app import schemas
from app.services import auth
from app.core import config
from jose import jwt
import datetime
import pytz
import json

class CRUDMessage(CRUDBase):

    def delete_message(self, message_id: int, db: Session) -> Optional[Dict]:
        try:
            stmt = delete(Message) \
                .where(Message.id == message_id) \
                .execution_options(synchronize_session="fetch")

            result = db.execute(stmt)

            if result.rowcount != 1:
                return {
                        'error': 'Could not find specified message to delete',
                        'status': 404
                       }

            db.commit()
            return {
                'status': 'deleted',
                'deleted_count': result.rowcount,
                'msg': 'message has been deleted'
            }
        except Exception:
            return {
                'error': 'Unable to delete message',
                'status': 500}

    def update_message(self, message_id: int,
                       db: Session, body: schemas.MessageUpdateIn
                       ) -> Optional[Dict]:
        try:
            stmt = select(Message) \
                .where(Message.id == message_id) \
                .where(Message.recipient_user_id == body.user_id) \
                .limit(1)

            row = db.scalars(stmt)
            row = row.first()

            if row is None:
                return {
                    'error': 'The  specified message does not exist',
                    'status': 404,
                }

            result = db.execute(
                update(Message)
                .where(Message.id == row.id)
                .values(read=body.action)
                .execution_options(synchronize_session="evaluate"))

            if (result.rowcount == 0):
                raise Exception

            db.commit()
            return {'status': 'updated',
                    'updated_count': result.rowcount}

        except Exception:
            return {
                'error': 'Unable to update message',
                'status': 500,
            }

    def delete_messages(self, db: Session, q_str) -> Optional[Dict]:

        try:
            ids = [int(id) for id in json.loads(q_str.ids)]

            stmt = delete(Message) \
                .where(Message.id.in_(ids)) \
                .execution_options(synchronize_session="fetch")

            result = db.execute(stmt)

            if result.rowcount == 0:
                return {
                    'error': 'The specified message(s) do not exist',
                    'status': 404}

            db.commit()

            return {
                'status': 'deleted',
                'deleted_count': result.rowcount
            }

        except Exception:
            return {
                'error': 'Unable to delete specified messages(s)',
                'status': 500}

    def update_messages(self, db: Session, data: schemas.MessagesUpdateIn) -> Optional[Dict]:

        try:
            stmt = update(Message) \
                .where(Message.id.in_(data.ids)) \
                .where(Message.recipient_user_id == int(data.user_id)) \
                .values(read=True) \
                .execution_options(synchronize_session="evaluate")

            result = db.execute(stmt)

            if result.rowcount == 0:
                return {
                    'error': 'The specified message(s) do not exist',
                    'status': 404
                }

            db.commit()
            return {
                'status': 'updated',
                'updated_count': result.rowcount
            }
        except Exception:
            return {
                'error': 'Unable to mark specified messages as read',
                'status': 500
            }

    def create_message(self, db: Session, form_data: schemas.MessagePostIn) -> Optional[Dict]:
        try:

            ip_address = auth.extract_ip()

            if not ip_address:
                return {
                    'error': 'Unable to submit message',
                    'status': 500
                }

            one_day = datetime.timedelta(hours=24)
            one_day_ago = datetime.datetime.utcnow() - one_day

            msg_limit_per_day = db.scalar(
                select(func.count())
                .select_from(Message)
                .where(Message.ip_address == ip_address)
                .where(Message.created_at > one_day_ago)
                .where(Message.post_id == form_data.post_id)
            )\

            if msg_limit_per_day >= 10:
                return {
                         'error': 'Please stop spamming this author.',
                         'status': 400
                      }

            obj_in = Message(
                created_at=datetime.datetime.utcnow(),
                read=False,
                ip_address=ip_address
            )
            for col, val in dict(form_data).items():
                setattr(obj_in, col, val)
            db.add(obj_in)
            db.commit()
            db.refresh(obj_in)

            return {'msg': 'success'}

        except Exception:
            return {
                'error': 'Unable to submit message',
                'status': 500
            }

    def retrieve_messages(self, q_str: schemas.AllMessagesIn,
                          db: Session,
                          authorization: str) -> Optional[Dict]:
        try:
            bearerToken = authorization.split(' ')[1]
            decoded_token = jwt.decode(
                                       bearerToken,
                                       config.settings.JWT_SECRET,
                                       config.settings.ALGORITHM,
                                       options={'verify_aud': False}
                                      )

        except Exception:
            return {
                'error': 'This user is forbidden from seeing messages',
                'status': 403}

        try:
            stmt = select(Message) \
                .options(
                         joinedload(Message.post)
                         .load_only('title', 'author_id', 'slug')) \
                .where(Message.recipient_user_id == int(decoded_token['sub'])) \
                .order_by(Message.created_at.desc()) \
                .offset(q_str.offset) \
                .limit(q_str.size)

            messages = db.execute(stmt).scalars().all()

            if len(messages) == 0:

                return {
                        'error': 'All your messages have been loaded.',
                        'status': 404
                }

            q_str.offset = q_str.offset + q_str.size
            q_str.page = q_str.page + 1

            for message in messages:
                message.ellipses = f"{' '.join(message.message.split(' ')[0:8])}..." \
                    if len(message.message.split(' ')) > 8 else message.message
                message.is_checked = False

                td = datetime.datetime.utcnow()
                one_day = 86400
                time_passed = int(abs(message.created_at.timestamp() - td.timestamp()))
                fmt = '%d|%-I:%M %p'

                if time_passed < one_day:
                    time = message.created_at.strftime(fmt)

                    est_time = datetime.datetime.strptime(time, "%d|%I:%M %p").replace(
                        tzinfo=pytz.utc).astimezone(pytz.timezone('EST')).strftime(fmt)
                    now_est_time = datetime.datetime.now(pytz.timezone('EST')).strftime(fmt)

                    prefix = 'Yesterday' if est_time.split('|')[0] != now_est_time.split('|')[0] else 'Today'
                    message.readable_date = f"{prefix} at {est_time.split('|')[1]}"
                else:
                    message.readable_date = message.created_at.strftime('%b %d %Y')

                message.post_link = f"{message.post.slug}-{str(message.post.id)}"
            return {'messages': messages, 'q_str': q_str}
        except Exception:
            return {
                'error': 'Unable to retrieve admin messages',
                'status': 500
            }
message = CRUDMessage(Message)
