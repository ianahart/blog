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


@router.put('/{tag_id}/admin', dependencies=[Depends(JWTBearer())], status_code=200)
def update_tags(*, tag_id: int, db: Session = Depends(deps.get_db), data: schemas.UpdateTag):
    result = crud.tag.update_tags(tag_id, db, data)

    if isinstance(result, dict):
        if 'error' in result:
            raise HTTPException(status_code=result['status'], detail=result['error'])

    return {'status': 'success', 'msg': 'tags have been updated'}
