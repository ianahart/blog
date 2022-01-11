import datetime
from typing import Dict
# pyright: reportMissingModuleSource=false
# pyright: reportMissingImports=false
from fastapi import File, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql.sqltypes import Boolean
from app.services import aws
from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.models.document import Document
from app.schemas.user import UserCreate, UserExists, UserVerify
from app.crud.base import CRUDBase


class CRUDUser(CRUDBase[User, UserCreate]):

    def verify(self, db: Session, obj_in: UserVerify) -> Boolean:

        document = db.query(Document).order_by(Document.id.desc()).first()

        if not isinstance(document, type(None)):
            # pyright: reportGeneralTypeIssues=false
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

    def upload(self, user_id: int, db: Session, avatar: File):

        if not user_id:
            return

        user = db.query(User).where(
            User.id == user_id).first()

        if isinstance(user, type(None)):
            raise HTTPException(404, detail="Could not find the user.")

        try:
            file_bytes = avatar.file.read()
        except: # noqa E722
            return

        if aws.file_size_exceeded(file_bytes):
            raise HTTPException(
                400, detail="File size must not exceed 2MB(megabytes).")

        try:
            [portrait_url, filename] = aws.upload_avatar(
                avatar=avatar, file_bytes=file_bytes, folder='avatars')

            if user.portrait_filename and user.portrait_url:
                aws.delete_file(folder='avatars',
                                filename=user.portrait_filename)

            user.portrait_url = portrait_url
            user.portrait_filename = filename

            db.commit()

            return portrait_url

        except: # noqa E722
            raise HTTPException(
                400, 'Unable to upload avatar make sure avatar is of type .png or .jpeg') # noqa E501


user = CRUDUser(User)
