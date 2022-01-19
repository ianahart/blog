from app.models import Tag
from sqlalchemy.orm.session import Session
from app.crud.base import CRUDBase
import datetime

class CRUDTag(CRUDBase):
    def create_tags(self, db: Session, data):

        tags = ''

        for key, inner in data:
            if isinstance(inner, list):
                for index in range(len(inner)):
                    if index > 0:
                        tags += '|' + inner[index].value
                    else:
                        tags += inner[index].value
        try:
            tag_obj = Tag(
                    text=tags,
                    post_id=data.post_id,
                    created_at=datetime.datetime.now()
            )

            db.add(tag_obj)
            db.commit()

            return {'success': 'tags created successfully'}
        except Exception as e:
            e_detail = str(e)

            return {'error': e_detail}

tag = CRUDTag(Tag)
