from typing import Optional, Dict

from fastapi.param_functions import Header
from sqlalchemy.orm import joinedload
from app.models import Message
from sqlalchemy import select, delete, func
from sqlalchemy.orm.session import Session
from app.crud.base import CRUDBase
from app import schemas
from app.services import auth
from app.core import config
from jose import jwt
import datetime
import pytz

class CRUDMessage(CRUDBase):
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

        except Exception as e:
            print(e)
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
                td = datetime.datetime.utcnow()
                one_day = 86400
                time_passed = int(abs(message.created_at.timestamp() - td.timestamp()))

                if time_passed < one_day:
                    time = message.created_at.strftime('%I:%M %p')
                    est_time = datetime.datetime.strptime(time, "%I:%M %p").replace(
                        tzinfo=pytz.utc).astimezone(pytz.timezone('EST')).strftime("%I:%M %p")
                    message.readable_date = f'Today at {est_time}'
                else:
                    message.readable_date = message.created_at.strftime("%b %d %Y")
                message.post_link = f'{message.post.slug}-{str(message.post.author_id)}'

            return {'messages': messages, 'q_str': q_str}
        except Exception as e:
            print(e)
message = CRUDMessage(Message)
