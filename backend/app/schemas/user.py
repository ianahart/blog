from typing import Optional, List
from pydantic import BaseModel, validator
import datetime
import re

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


class UserUpdateInfo(BaseModel):
    first_name: str
    last_name: str
    password: Optional[str]

    @validator('first_name')
    def firstname_size(cls, v):
        if len(v) <= 0 or len(v) > 75:
            raise ValueError('First name must be between 1 and 75 characters.')
        elif not v.isalpha():
            raise ValueError('First name must be only letters.')
        return v.strip().title()

    @validator('last_name')
    def lastname_size(cls, v):
        if len(v) <= 0 or len(v) > 75:
            raise ValueError('Last name must be between 1 and 75 characters.')
        elif not v.isalpha():
            raise ValueError('Last name must be only letters.')
        return v.strip().title()

    @validator('password')
    def password_reqs_met(cls, v):
        if not v:
            return
        special_ch, digit, upper, lower = False, False, False, False
        error_msg = ('Password must include 1'
                     'uppercase, 1 lowercase, 1 digit, and 1 special character.')
        
        if len(v.strip()) < 12:
        
            raise ValueError('Password must be greater than 12 characters.')
        
        for ch in v:
            if ch.isdigit():
                digit = True
            if ch.islower():
                lower = True
            if ch.isupper():
                upper = True
            if not ch.isalnum():
                special_ch = True

        if not all([special_ch, digit, upper, lower]):
            raise ValueError(error_msg)

        return v

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
