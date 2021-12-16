from typing import Any, Optional

from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app.crud.crud_post import CRUDPost

router = APIRouter()

# frontend '/api/v1/posts/'


@router.get('/')
def get_posts():
    all_posts = CRUDPost.get_all_posts()
    return all_posts
