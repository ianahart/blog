from typing import Any, Dict, Optional
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends, Query

from app.api import deps
from app.services import auth
from app import services, schemas
# from app.schemas.auth import AuthLogin


router = APIRouter()


@router.post('/logout')
def logout():
    return {'status': 'user logged out!'}


@router.post('/login')
def login(*, db: Session = Depends(deps.get_db), credentials: schemas.auth.AuthLogin) -> Optional[Dict]:
    auth = services.auth.authenticate(db, credentials=credentials)
    print(auth)

    if not isinstance(auth['error'], type(None)):
        raise HTTPException(400, auth['error'])

    return auth
