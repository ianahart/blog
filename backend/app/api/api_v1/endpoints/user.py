from typing import Any, Dict
from fastapi import APIRouter, HTTPException, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.core.auth_bearer import JWTBearer
from app import crud, schemas, utils
from app.api import deps

router = APIRouter()


@router.post('/', status_code=201, response_model=schemas.User)
def create_user(*, db: Session = Depends(deps.get_db), user_in: schemas.UserCreate) -> Any:  # noqa E401
    msg = ''
    for credential in user_in.credentials:
        credential = credential.dict()

        if credential['name'] == 'email':
            msg = utils.validate.email(email=credential['value'])

    if len(msg) > 0:
        exception = utils.error.message(msg, 'email')
        raise HTTPException(400, detail=exception)

    user = crud.user.exists(db, user_in)

    if user:
        raise HTTPException(400,
                            default="A user with that username already exists in our system."  # noqa E501
                            )  # noqa E501

    user = crud.user.create(db, obj_in=user_in)

    return user


@router.post('/exists', status_code=200)
def user_exists(*, db: Session = Depends(deps.get_db), user_in: schemas.UserExists) -> Dict:  # noqa E501:

    msg = utils.validate.email(email=user_in.email)

    if len(msg):
        exception = utils.error.message(msg, 'email')

        raise HTTPException(400, detail=exception)

    user_exists = crud.user.exists(db, obj_in=user_in)

    return {'user_exists': user_exists}


@router.post('/verify', status_code=200)
def verify_user(*, db: Session = Depends(deps.get_db), user_in: schemas.UserVerify) -> Dict:  # noqa E501

    is_user_verified = crud.user.verify(db, obj_in=user_in)
    if not is_user_verified:
        exception = utils.error.message(
            'Unable to verify you.', 'temp_password')
        raise HTTPException(400, detail=exception)

    return {'is_user_verified': is_user_verified}

# pyright: reportGeneralTypeIssues=false


@router.patch('/{user_id}/avatar', dependencies=[Depends(JWTBearer())], status_code=200)  # noqa E501
def upload_avatar(*, user_id: int, db: Session = Depends(deps.get_db), avatar: UploadFile = File(...)) -> Dict:  # noqa E501

    avatar_url = crud.user.upload(user_id, db, avatar)

    if avatar_url:
        return {
            'user_id': user_id,
            'msg': 'Avatar changed',
            'avatarUrl': avatar_url
        }


@router.patch('/{user_id}', dependencies=[Depends(JWTBearer())], status_code=200)
def update_user(
        *,
        user_id: int,
        db: Session = Depends(deps.get_db),
        user: schemas.UserUpdateInfo):

    try:

        user_values = crud.user.update_user(user_id, db, dict(user))

        if user_values[0] != 'error':

            updated_attrs = dict(zip(['firstName', 'lastName'], user_values))
            return {'msg': 'User information updated.', 'attrs': updated_attrs}
        else:
            raise Exception(user_values[1])

    except Exception as e:
        raise HTTPException(400, detail=str(e))
