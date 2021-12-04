from fastapi import Depends, FastAPI
from routers import users, posts
app = FastAPI()

app.include_router(
    users.router,
    prefix="/api/v1",
    tags=["users"],
)

app.include_router(
    posts.router,
    prefix="/api/v1",
    tags=["posts"],
)
