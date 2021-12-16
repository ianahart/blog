from typing import Any, Optional

from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app.crud.crud_tag import CRUDTag

router = APIRouter()


@router.post('/')
def get_tags():

    return CRUDTag.get_all_tags()
