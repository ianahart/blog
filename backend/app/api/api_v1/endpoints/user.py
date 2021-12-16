from typing import Any, Dict, Optional, List
from fastapi import APIRouter, HTTPException, Depends, Query, Request
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, schemas, models
from app.core.config import settings
from app.api import deps
from app.crud.crud_user import CRUDUser


router = APIRouter()

# ---- PRINT OUT BODY----
# async def create_user(user_in: schemas.UserCreate):
# print(user_in)
# p = await request.json()
# print(p)


@router.post('/', status_code=201, response_model=schemas.User)
def create_user(*, db: Session = Depends(deps.get_db), user_in: schemas.UserCreate):

    user = crud.user.create(db, obj_in=user_in)
    return user


@ router.post('/temp')
def user_temp():
    return {'temp_password': 'correct'}


@ router.get('/admin')
def read_users():
    return {'users': ['user1', 'user2', 'user3']}


@ router.get('/admin/{user_id}')
def update_user(user_id: int):
    return {'user': 'user updated'}
