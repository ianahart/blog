from datetime import datetime, timedelta
from typing import Any, Union
from fastapi.param_functions import Depends
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.core import config
from app.models import Token
from app.api import deps

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"


def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:

    if expires_delta:
        expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=config.settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    claims = {'exp': expire, 'sub': str(subject)}

    encoded_jwt_token = jwt.encode(
        claims, config.settings.JWT_SECRET, ALGORITHM)

    return encoded_jwt_token


def save_access_token(*, db: Session = Depends(deps.get_db), subject: int, access_token: str) -> None:

    existing_token = db.query(Token).where(Token.user_role_id == subject).where(
        Token.token_valid_to > datetime.utcnow()).first()

    if existing_token:
        return
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=config.settings.ACCESS_TOKEN_EXPIRE_MINUTES)

        token_row = Token(
            created_at=datetime.now(),
            token_valid_from=datetime.utcnow(),
            token_valid_to=expire,
            access_token=access_token,
            user_role_id=int(subject))

        db.add(token_row)
        db.commit()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
