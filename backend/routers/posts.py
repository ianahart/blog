from fastapi import APIRouter
from resources.post import PostResource

router = APIRouter()


@router.get("/posts")
def read_posts():
    post = PostResource()
    return post.get_posts()
