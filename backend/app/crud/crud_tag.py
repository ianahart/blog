from typing import Optional, Dict

from sqlalchemy.orm import joinedload, load_only, subqueryload
from app.models import Tag
from app.models import Post
from sqlalchemy import update, select
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
                    text=tags.lower(),
                    post_id=data.post_id,
                    created_at=datetime.datetime.now()
            )

            db.add(tag_obj)
            db.commit()

            return {'success': 'tags created successfully'}
        except Exception as e:
            e_detail = str(e)

            return {'error': e_detail, 'status': 500}

    def retrieve_tags(self, tag_text: str, db: Session,
                      q_str: schemas.RetrieveTagsIn) -> Optional[Dict]:

        try:
            if q_str.limit < 0 or q_str.offset < 0:
                raise Exception('Malformed url string.')

            stmt = select(Tag) \
                .options(
                    joinedload(Tag.post)
                    .load_only('slug', 'title', 'created_at', 'id')
                .joinedload(Post.author)
                    .load_only('first_name', 'last_name', 'portrait_url')) \
                .where(
                    Tag.text.contains(tag_text) | Tag.text.contains(
                        tag_text.replace(' ', ''))) \
                .offset(q_str.offset) \
                .limit(q_str.limit)

            result = db.scalars((stmt)).all()

            if len(result) == 0:
                return {
                    'error': 'All tags have been loaded.',
                    'status': 400,
                }

            q_str.offset = q_str.offset + q_str.limit

            for row in result:
                row.post.title = row.post.title.title()
                row.text = row.text.split('|')
                row.post.readable_date = row.post.created_at.strftime("%b %d %y")

            updated_q_str = ''
            for index, query_p in enumerate(q_str):
                k_v = f'{query_p[0]}={query_p[1]}'
                updated_q_str += f'&{k_v}' if index > 0 else f'?{k_v}'

            return {
                'status': 'tags retrieved',
                'tags': result,
                'q_str': updated_q_str
                    }
        except Exception:
            return {
                'error': 'Unable to retrieve tags. Something went wrong.',
                'status': 500,
            }

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
                    text=text.lower()
                )
                .execution_options(synchronize_session="fetch"))
            db.commit()

            return {'data': updated}
        except Exception as e:
            return {
                'error': 'Unable to update the post tags',
                'status': 500}

tag = CRUDTag(Tag)
