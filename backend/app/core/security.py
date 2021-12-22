from base64 import decode
from jose import jwt
import time
from jose.exceptions import ExpiredSignatureError
from sqlalchemy.orm import Session
from typing import Any, Union, Dict
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi.param_functions import Depends

from app.api import deps
from app.core import config
from app.models import Token
from app.models import User
from dotenv import load_dotenv
load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_token(subject: Union[str, Any], db: Session = Depends(deps.get_db)) -> Any:
    try:

        existing_token = db.query(Token).where(
            Token.user_role_id == subject).first()
        return existing_token

    except:
        return None


def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:

    if expires_delta:
        expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=config.settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    claims = {'exp': expire, 'sub': str(subject)}

    encoded_jwt_token = jwt.encode(
        claims, config.settings.JWT_SECRET, config.settings.ALGORITHM)

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


def decode_access_token(access_token: str, db: Session) -> Dict:

    try:

        decoded_access_token = jwt.decode(
            access_token,
            config.settings.JWT_SECRET, config.settings.ALGORITHM,
            options={'verify_aud': False}
        )

        match = db.query(Token).where(
            Token.user_role_id == decoded_access_token['sub']
        ).where(
            Token.access_token == access_token).first()

        if not match:
            return None

        return True if decoded_access_token['exp'] > int(time.time()) else None
    except jwt.ExpiredSignatureError:

        db.query(Token).where(Token.access_token == access_token).delete()

        db.commit()
        return {}


def destroy_access_token(access_token: str, db: Session) -> None:

    if not access_token:
        return

    token_row = db.query(Token).where(
        Token.access_token == access_token).first()

    db.delete(token_row)
    db.commit()


def invalidate_token(access_token: str, db: Session) -> Any:
    try:
        decoded_token = jwt.decode(
            access_token, config.settings.JWT_SECRET,
            config.settings.ALGORITHM, options={'verify_aud': False}
        )

        db.query(Token).where(
            Token.user_role_id == int(decoded_token['sub'])).delete()

        db.commit()
    except jwt.ExpiredSignatureError:
        print('Expired Token def invalidate_token')
        return None
