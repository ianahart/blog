from fastapi import APIRouter
from app.api.api_v1.endpoints import user, post, auth, tag

api_router = APIRouter()
api_router.include_router(auth.router, prefix='/auth')
api_router.include_router(post.router, prefix='/posts')
api_router.include_router(user.router, prefix='/users/admin')
api_router.include_router(tag.router, prefix='/tags')
