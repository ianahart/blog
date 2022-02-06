import datetime
import re
from typing import Optional, Dict, List
from pydantic import BaseModel, validator


class MessageBase(BaseModel):
    id: Optional[int] = None
    recipient_user_id: Optional[int] = None
    post_id: Optional[int] = None
    created_at: Optional[datetime.datetime]
    read: Optional[bool] = False
    message: Optional[str] = None
    sender: Optional[str] = None
    contact: Optional[str] = None
    type_contact: Optional[str] = None


class AllMessagesOutPost(BaseModel):
    id: int
    author_id: Optional[str] = None
    title: Optional[str] = None
    slug: Optional[str] = None

    class Config:
        orm_mode = True

class AllMessagesOutMessage(BaseModel):
    id: int
    contact: Optional[str] = None
    ip_address: Optional[str] = None
    message: str
    ellipses: str
    post_id: int
    is_checked: bool
    post: AllMessagesOutPost
    post_link: Optional[str] = None
    read: Optional[bool] = None
    recipient_user_id: int
    sender: Optional[str] = None
    type_contact: Optional[str] = None
    created_at: Optional[datetime.datetime] = None
    readable_date: Optional[str] = None

    class Config:
        orm_mode = True


class AllMessagesOutChild(BaseModel):
    messages: List[AllMessagesOutMessage]
    q_str: dict

    class Config:
        orm_mode = True

class AllMessagesOut(BaseModel):
    status: Optional[str] = None
    result: AllMessagesOutChild

    class Config:
        orm_mode = True

class AllMessagesIn(BaseModel):
    size: int
    offset: int
    page: int


class MessagePostOut(BaseModel):
    msg: Optional[str] = None


class MessagePostIn(BaseModel):
    recipient_user_id: int
    post_id: int
    message: str
    sender: str
    type_contact: Optional[str] = None
    contact: Optional[str] = None

    @validator('sender')
    def validate_sender(cls, v):
        pattern = re.compile(r"^[0-9a-zA-Z ]+$")
        matched = re.fullmatch(pattern, v)
        if not matched:
            raise ValueError('Name must only consist of numbers and letters')
        return v.strip()

    @validator('message')
    def validate_message(cls, v):
        pattern = re.compile(r"^[a-zA-Z0-9,\s,!'.]*$")
        matched = re.fullmatch(pattern, v)
        if not matched:
            raise ValueError('Message must not have special characters.')
        return v.strip()

    @validator('contact')
    def validate_contact(cls, v, values, **kwargs):
        contact_type = values['type_contact'].lower()
        regex = None
        error = None
        if contact_type == 'other':
            regex = r"^[0-9a-zA-Z ]+$"
            error = 'Other must only consist of numbers and letters'
        elif contact_type == 'email':
            regex = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
            error = 'Email address is not valid'
        else:
            regex = r"^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
            error = 'Phone is not a valid number'
        pattern = re.compile(regex)
        matched = re.fullmatch(pattern, v)
        if not matched:
            raise ValueError(error)
        return v.strip()
