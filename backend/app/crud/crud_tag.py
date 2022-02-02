from app.models import Tag
from sqlalchemy import update
from sqlalchemy.orm.session import Session
from app.crud.base import CRUDBase
from app import schemas
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

            return {'error': e_detail, 'status': 500}

    def update_tags(self, tag_id: int, db: Session, data: schemas.UpdateTag):
        try:
            text = ''

            for key, inner in enumerate(data.tags):
                value = inner.value.strip()
                tag = f'{value}'.strip() if key == 0 else f'|{value}'
                text += tag

            updated = db.execute(
                update(Tag)
                .where(Tag.id == tag_id)
                .where(Tag.post_id == int(data.post_id))
                .values(
                    post_id=int(data.post_id),
                    created_at=datetime.datetime.utcnow(),
                    text=text
                )
                .execution_options(synchronize_session="fetch"))
            db.commit()

            return {'data': updated}
        except Exception as e:
            return {
                'error': 'Unable to update the post tags',
                'status': 500}

tag = CRUDTag(Tag)
