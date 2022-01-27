from sqlalchemy.orm import load_only
from typing import Dict, Any, Tuple, List
from sqlalchemy.orm.session import Session
from app.models.post import Post
from app import schemas
from fastapi import HTTPException
from app.utils import string_util
from app.core import config
from app.services import aws
from jose import jwt
import json
import datetime


class CRUDPost:
    def retrieve_all_posts(self, db: Session, q_str: schemas.PostPreviewIn) -> Dict:

        try:

            q_str, order = self.paginate(q_str)

            rows = db.query(Post).options(
                    load_only(
                        'id',
                        'title',
                        'slug',
                        'read_time',
                        'author_id',
                        'created_at',
                        'cover_image_path',
                    )) \
                .order_by(order) \
                .slice(q_str.start, q_str.end)

            if rows.first() is None:
                raise Exception('All posts have been loaded.')

            previews = self.create_previews(rows)
            return {'posts': previews, 'pagination': q_str}
        except Exception as e:

            e_detail = str(e)
            return {'error': e_detail}

    def create_previews(self, rows) -> List:

        previews = []

        for row in rows:
            row.portrait_url = row.author.portrait_url

            if row.author.first_name is not None and row.author.last_name is not None:
                row.author_name = row.author.first_name + ' ' + row.author.last_name
            row.title = row.title.title()

            if row.tag.text.count('|') > 0:
                tags = row.tag.text.split('|')
                row.tag.text = [tag.title() for tag in tags]
                row = row.__dict__

            for col in row:
                if '_sa_' not in col:
                    if col == 'created_at':
                        row[col] = row[col].strftime("%b %d '%y")

            previews.append(row)

        return previews

    def paginate(self, q_str) -> Tuple[Any, schemas.PostPreviewIn]:
        order = None

        if q_str.tab == 'top':
            order = Post.title.asc()
        elif q_str.tab == 'relevant':
            order = Post.created_at.asc()
        else:
            # default latest tab
            order = Post.created_at.desc()

        if q_str.direction == 'prev':
            q_str.page = q_str.page - 1
            q_str.end = q_str.start
            q_str.start = q_str.end - q_str.limit
        else:
            if q_str.direction != 'initial_load':
                q_str.page = q_str.page + 1
                q_str.start = q_str.end
            else:
                q_str.start = 0
                q_str.page = 1
            q_str.end = q_str.start + q_str.limit

        return q_str, order

    def create_post(self, db: Session, form_data: dict, file):

        form_data = {key: json.loads(val) for key, val in form_data.items()}
        temp = {key: form_data[key] for key in [
            'title', 'post', 'author_id', 'read_time']}

        post_in = {**temp, **{'post': [], 'cover_file': {}}}

        try:
            form_data['url'] = file.file.read()
            [object_url, filename] = aws.upload_file(form_data)

            post_in['cover_file']['url'] = object_url
            post_in['cover_file']['filename'] = filename

        except Exception:
            raise HTTPException(
                500, detail='Unable to upload cover image file to web service.')  # noqa E501

        for post_el in form_data['post']:
            post_el = {key: val for key,
                       val in post_el.items() if val is not None}

            if post_el['type'] == 'image':
                try:
                    [object_url, filename] = aws.upload_file(post_el)
                    post_el['url'] = object_url
                    post_el['filename'] = filename
                except Exception:
                    raise HTTPException(
                        500, detail='Unable to upload images in your blog post to web service.')  # noqa E501

            post_in['post'].append(post_el)

        db_obj = Post(
            author_id=int(post_in['author_id']),
            created_at=datetime.datetime.now(),
            title=post_in['title'].title(),
            slug=string_util.slugify(post_in['title']),
            cover_image_filename=post_in['cover_file']['filename'],
            cover_image_path=post_in['cover_file']['url'],
            content={'post': post_in['post']},
            read_time=post_in['read_time'],
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj.id

    def retrieve_admin_posts(self,
                             db: Session,
                             user_id: int,
                             authorization: str,
                             q_string: schemas.AdminPostPreviewIn
                             ):
        try:

            access_token = authorization.split(' ')[1]
            decoded_token = jwt.decode(
                access_token,
                config.settings.JWT_SECRET,
                config.settings.ALGORITHM, options={'verify_aud': False}
            )

        except ValueError:
            return {'error': 'Bearer token is invalid.', 'status_code': 403}

        if user_id != int(decoded_token['sub']):
            return {'error': 'User is not authorized for this action.', 'status_code': 403}

        start = q_string.total
        end = q_string.total + q_string.size

        rows = db.query(Post) \
            .filter_by(author_id=decoded_token['sub']) \
            .order_by(Post.created_at.desc()) \
            .slice(start, end)

        if rows.first() is None:
            return {'error': 'All posts have been loaded.', 'status_code': 404}

        previews = self.create_previews(rows)

        return {'posts': previews, 'pagination': q_string}


post = CRUDPost()
