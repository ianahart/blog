import datetime
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy.sql.sqltypes import DateTime
from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.schemas.user import UserCreate
from app.crud.base import CRUDBase


class CRUDUser(CRUDBase[User, UserCreate]):
    def create(self, db: Session, *, obj_in: UserCreate) -> User:

        cred_dict = {}

        for item in obj_in.body:
            item = item.dict()
            cred_dict[item['name']] = item['value']

        db_obj = User(email=cred_dict['username'],
                      hashed_password=get_password_hash(cred_dict['password']),
                      temp_password=cred_dict['temp_password'],
                      created_at=datetime.datetime.now()
                      )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj


user = CRUDUser(User)
