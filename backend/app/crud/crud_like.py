from typing import Optional, Dict
from app.models import Like
from sqlalchemy.orm.session import Session
from app.crud.base import CRUDBase
from app import schemas
from datetime import datetime
from app.services import auth

class CRUDLike(CRUDBase):
    def create_like(self, db: Session, data: schemas.LikeCreate, user_agent: str) -> Optional[Dict]:

        user_agent = 'blocked' if not isinstance(user_agent, str) else user_agent
        ip_address = auth.extract_ip()

        already_liked = db.query(Like) \
            .where(Like.post_id == data.post_id) \
            .where(Like.ip_address == ip_address) \
            .where(Like.user_agent == user_agent) \
            .first()

        if already_liked is not None:
            return {
                'error': 'You have already liked this post',
                'status': 400
            }

        new_like = Like(
            post_id=data.post_id,
            user_agent=user_agent,
            ip_address=ip_address,
            created_at=datetime.utcnow(),
            updated_at=None
               )
        try:
            db.add(new_like)
            db.commit()

            db.refresh(new_like)

        except Exception:
            return {
                'error': 'Something went wrong liking this post',
                'status': 500
            }
        return {'like_id': new_like.id}

    def delete_like(self, like_id: int, db: Session):

        try:
            row = db.query(Like).where(Like.id == like_id).first()

            if row is None:
                raise ValueError('No like with that id exists.')

            db.delete(row)
            db.commit()

            return {'msg': f' like id: {like_id} has been deleted'}
        except Exception:
            return {
                    'error': 'Something went wrong un-liking this post',
                    'status': 500
            }

like = CRUDLike(Like)
