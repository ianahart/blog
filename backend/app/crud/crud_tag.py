from typing import Optional, Dict

from sqlalchemy.orm import joinedload, load_only, subqueryload
from app.models import Tag
from app.models import Post
from sqlalchemy import update, select
from sqlalchemy.orm.session import Session
from app.crud.base import CRUDBase
from app import schemas
import datetime
import re

class CRUDTag(CRUDBase):
    def search_tags(self, q_str: schemas.TagSearchIn, db: Session) -> Optional[Dict]:

        try:
            pattern = re.compile(r"^[a-zA-Z0-9,\s+.]*$")
            matched = re.fullmatch(pattern, q_str.q)

            if not matched:
                raise Exception('Search term may not include special chars.')

        except Exception as e:
            error = str(e)
            return {
                'error': error,
                'status': 422
            }
        try:
            q_str.q = q_str.q.strip().lower()

            query = select(Tag).options(
                    joinedload(Tag.post)
                    .load_only('cover_image_path', 'title', 'slug')) \
                .where(Tag.text.contains(q_str.q)) \
                .order_by(Tag.id) \
                .offset(q_str.offset).limit(q_str.limit)

            rows = db.scalars(query).all()

            if len(rows) == 0 and q_str.offset:
                return {
                    'error': f'All posts loaded that are related to {q_str.q}',
                    'status': 404,
                }

            if len(rows) == 0:
                return {
                    'error': f'Did not find any results for {q_str.q}',
                    'status': 404
                }

            for row in rows:
                row.text = row.text.split('|')
                row.post.slug = f'{row.post.slug}-{row.post.id}'

            return {
                'results': rows,
                'offset': q_str.limit + q_str.offset
                if q_str.offset is not None else q_str.limit
            }

        except Exception:
            return {
                'error': 'Unable to retrieve search results',
                'status': 500
            }

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
