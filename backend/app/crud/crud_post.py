import uuid
from sqlalchemy.orm import load_only, joinedload
from typing import Dict, Any, Optional, Tuple, List
from sqlalchemy.orm.session import Session
from app.models.post import Post
from app import schemas
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from app.utils import string_util
from app.core import config
from app.services import aws, auth
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
            print(e)
            e_detail = str(e)
            return {'error': e_detail}

    def user_liked(self, post) -> Optional[Dict]:
        user_has_liked = {
            'user_has_liked': False,
            'id': None
        }
        for like in post.likes:
            if like.ip_address == auth.extract_ip():
                return {
                    'user_has_liked': True,
                    'id': like.id
                }
        return user_has_liked

    def create_previews(self, rows) -> List:
        previews = []
        for row in rows:
            if row.likes is not None:
                has_liked = self.user_liked(row)
                if has_liked:
                    row.user_has_liked = has_liked['user_has_liked']
                    row.like_count = len(row.likes)
            row.portrait_url = row.author.portrait_url
            if row.author.first_name is not None and row.author.last_name is not None:
                row.author_name = row.author.first_name + ' ' + row.author.last_name
            row.title = row.title.title()
            if row.tag is not None:
                if row.tag.text.count('|') > 0:
                    tags = row.tag.text.split('|')
                    row.tag.text = [tag.title() for tag in tags]
                else:
                    row.tag.text = [row.tag.text.title()]
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

    def retrieve_post(self, path: str, db: Session) -> Dict:

        post_id = path.split('-')[-1]
        slug = '-'.join(path.split('-')[0:-1])

        if isinstance(post_id, type(None)):
            return {
                'error': 'Malformed segement in Url path.',
                'status_code': 400
            }
        else:
            try:
                post_id = int(post_id)
            except ValueError:
                return {'error': 'The post was not found', 'status': 404}

        try:
            post = db.query(Post) \
                .options(joinedload('author')
                         .load_only('first_name', 'last_name', 'portrait_url')) \
                .where(Post.id == post_id) \
                .where(Post.slug == slug)\
                .first()

            if not post or isinstance(post, type(None)):
                return {
                    'error': 'Could not find post',
                    'status': 404
                }

            content = []

            for node in post.content['post']:
                if node['type'] == 'image':
                    node['edit_marker'] = uuid.uuid4()
                content.append(node)

            post.content['post'] = content
            post.tag_id = post.tag.id
            post.tags = post.tag.text.split('|')
            post.created_at = post.created_at.strftime("%b %d %Y")

            post.user_has_liked = False
            post.like_count = 0

            if post.likes is not None:
                has_liked = self.user_liked(post)
                if has_liked:
                    post.user_has_liked = has_liked['user_has_liked']
                    post.like_count = len(post.likes)
                    post.like_id = has_liked['id']
            return {'post': post}

        except Exception as e:
            print(e)
            return {
                'error': 'Unable to complete request',
                'status': 500
            }

    def update_post(self, db: Session, form: Dict, post_id: int):
        try:
            cover = {'url': '', 'filename': '', 'contentType': ''}
            cur_post = db.query(Post).where(Post.id == post_id).first()
            tag_id = cur_post.tag.id

            if not cur_post or isinstance(cur_post, type(None)):
                return {
                    'error':
                    'Unable to find your post to update.',
                    'status': 404
                }

            cur_post = jsonable_encoder(cur_post)

        except Exception as e:
            print(e)
            return {'error': 'You provided the wrong post', 'status': 400}

        title = form['title'].replace('"', '').lower().split(' ')
        slug = ''
        for index, word in enumerate(title):
            if index == 0:
                slug += f'{word}'
            else:
                slug += f'-{word}'

        if isinstance(form['file'], type(None)):
            cover['url'] = cur_post['cover_image_path']
            cover['filename'] = cur_post['cover_image_filename']
        else:
            form['url'] = form['file'].file.read()
            [object_url, filename] = aws.upload_file(form)
            if object_url and filename:
                cover['url'] = object_url
                cover['filename'] = filename
                aws.delete_file('', cur_post['cover_image_filename'])

        new_nodes = [node for node in json.loads((form['post'])) if node['type'] == 'image']
        cur_nodes = [node for node in cur_post['content']['post'] if node['type'] == 'image']

        new_urls = [new_node['url'] for new_node in new_nodes]
        new_filenames = [new_node['filename'] for new_node in new_nodes]

        for index, cur_node in enumerate(cur_nodes):
            if cur_node['url'] not in new_urls:
                filename = aws.get_file(cur_node['filename'])
                if filename:
                    aws.delete_file('', filename)
            elif cur_node['filename'] in new_filenames:
                new_filenames.remove(cur_node['filename'])

        updated_content = []
        for index, node in enumerate(json.loads((form['post']))):
            if node['type'] == 'image' and node['filename'] in new_filenames:
                [object_url, filename] = aws.upload_file(node)
                node['url'] = object_url
                node['filename'] = filename
            updated_content.append(node)
        try:
            db.query(Post).where(Post.id == post_id).update({
                'created_at': datetime.datetime.utcnow(),
                'author_id': int(form['author_id']),
                'slug': slug,
                'cover_image_filename': cover['filename'],
                'cover_image_path': cover['url'],
                'content': {'post': updated_content},
                'read_time': form['read_time'],
                'is_edited': True
            })
            db.commit()
            return {'tag_id': tag_id}
        except Exception:
            return {'error': 'Unable to update your blog post at this time.', 'status': 500}

    def delete_post(self, post_id: int, db: Session) -> Optional[Dict]:

        try:
            result = db.query(Post).where(Post.id == post_id).delete()
            db.commit()

            if result:
                return {'result': result}
        except Exception as exception:
            if exception:
                return {'error': 'Unable to delete post', 'status': 500}

post = CRUDPost()
