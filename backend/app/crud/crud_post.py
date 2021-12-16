from app.models.post import Post
from app.crud.base import CRUDBase


class CRUDPost:
    def get_all_posts():
        return [
            {'text': 'lorem ipsum1', 'id': 1},
            {'text': 'lorem ipsum2', 'id': 2},
            {'text': 'lorem ipsum3', 'id': 3}
        ]


post = CRUDPost()
