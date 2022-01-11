from typing import Dict

# pyright: reportMissingImports=false
# pyright: reportMissingModuleSource=false
from sqlalchemy.orm.session import Session
from app.models.post import Post
from app.services import aws
from fastapi import HTTPException
from app.utils import string_util
import json
import datetime


class CRUDPost:
    def get_all_posts(self, db: Session):

        # posts = db.query(Post).all()
        # for row in posts:
        #     print(row.author.email)

        return [
            {'text': 'lorem ipsum1', 'id': 1},
            {'text': 'lorem ipsum2', 'id': 2},
            {'text': 'lorem ipsum3', 'id': 3}
        ]

    def create_post(self, db: Session, form_data: dict, file) -> Dict:

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
                        500, detail='Unable to upload images in your blog post to web service.') # noqa E501 

            post_in['post'].append(post_el)

        db_obj = Post(
            author_id=int(post_in['author_id']),
            created_at=datetime.datetime.now(),
            title=post_in['title'],
            slug=string_util.slugify(post_in['title']),
            cover_image_filename=post_in['cover_file']['filename'],
            cover_image_path=post_in['cover_file']['url'],
            content={'post': post_in['post']},
            read_time=post_in['read_time'],
        )
        db.add(db_obj)
        db.commit()

        return post_in


post = CRUDPost()
