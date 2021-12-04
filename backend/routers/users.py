from fastapi import APIRouter
from resources.user import UserResource
router = APIRouter()


@router.get("/users")
def read_users():
    user = UserResource()
    return user.get_users()
