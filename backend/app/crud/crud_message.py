from typing import Optional, Dict
from app.models import Message
from sqlalchemy import select, delete, func
from sqlalchemy.orm.session import Session
from app.crud.base import CRUDBase
from app import schemas
from app.services import auth
import datetime

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


message = CRUDMessage(Message)
