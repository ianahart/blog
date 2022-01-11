from typing import Dict, Optional
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends, Request


from app.api import deps
from app import services, schemas
from app.core.auth_bearer import JWTBearer
from app.core import security

router = APIRouter()


@router.delete('/logout', dependencies=[Depends(JWTBearer())])
def logout(request: Request, db: Session = Depends(deps.get_db)):

    try:
        access_token = request.headers['authorization'].split(' ')[1]

        security.destroy_access_token(access_token=access_token, db=db)

        return {'user_status': 'User has been logged out.'}
    except:  # noqa E722
        raise HTTPException(400, detail='Unable to complete logout.')


@router.post('/login', status_code=200)
def login(*, db: Session = Depends(deps.get_db), credentials: schemas.auth.AuthLogin) -> Optional[Dict]:  # noqa E501
    auth = services.auth.authenticate(db, credentials=credentials)
    if not isinstance(auth['error'], type(None)):
        raise HTTPException(400, auth['error'])

    return auth
