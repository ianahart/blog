from typing import Optional, List, Dict
from pydantic import BaseModel, ValidationError, validator
import datetime
# Shared properties


class UserBase(BaseModel):
    id: Optional[int] = None
    created_at: Optional[datetime.datetime]
    email: Optional[str] = None
    first_name: Optional[str] = None
    role: Optional[str] = None
    last_name: Optional[str] = None
    is_logged_in: Optional[bool] = None
    temp_password: Optional[str] = None


class Credential(UserBase):
    name: Optional[str] = None
    value: Optional[str] = None
    error: str


class UserCreate(UserBase):
    credentials: List[Credential]

    class Config:
        orm_mode = True


class UserExists(UserBase):
    email: str

    class Config:
        orm_mode = True


class UserVerify(UserBase):
    temp_password: str

    class Config:
        orm_mode = True


class UserInDBBase(UserBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    slug: Optional[str] = None


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str
    temp_pasword: str
    token: str
    last_login: Optional[datetime.datetime]
