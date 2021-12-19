import datetime
from typing import Dict, Optional
from sqlalchemy.orm import Session
from sqlalchemy.sql.sqltypes import Boolean
from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.models.document import Document
from app.schemas.user import UserCreate, UserExists, UserVerify
from app.crud.base import CRUDBase


class CRUDUser(CRUDBase[User, UserCreate]):

    def verify(self, db: Session, obj_in: UserVerify) -> Boolean:

        document = db.query(Document).order_by(Document.id.desc()).first()

        if not isinstance(document, type(None)):
            return verify_password(obj_in.temp_password, document.password)

        return False

    def exists(self, db: Session, obj_in: UserExists) -> Dict:

        user = db.query(User).where(
            User.email == obj_in.email).where(
            User.temp_password_changed).first()

        return True if not isinstance(user, type(None)) else False

    def create(self, db: Session, *, obj_in: UserCreate) -> User:

        cred_dict = {}

        for credential in obj_in.credentials:
            credential = credential.dict()
            cred_dict[credential['name']] = credential['value']

        db_obj = User(email=cred_dict['email'],
                      hashed_password=get_password_hash(cred_dict['password']),
                      temp_password_changed=True,
                      created_at=datetime.datetime.now(),
                      role='admin'
                      )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj


user = CRUDUser(User)
