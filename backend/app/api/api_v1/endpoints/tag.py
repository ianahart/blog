from typing import Any, Optional
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app import crud, schemas
from app.core.auth_bearer import JWTBearer
from app.api import deps

router = APIRouter()


@router.post('/admin', dependencies=[Depends(JWTBearer())], status_code=201)
def create_tags(*, db: Session = Depends(deps.get_db), data: schemas.AddTag):
    tags = crud.tag.create_tags(db, data)

    if 'error' in tags:
        raise HTTPException(status_code=400, detail=tags['error'])

    return tags
