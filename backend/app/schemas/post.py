from typing import Optional, List, Dict
from pydantic import BaseModel, validator
import datetime
import json


class PostBase(BaseModel):
    id: Optional[int] = None
    author_id: Optional[int] = None
    created_at: Optional[datetime.datetime]
    slug: Optional[str] = None
    title: str
    cover_image_filename: str
    cover_image_url: str
    content: Optional[str] = None
    read_time: Optional[str] = None


class PostPreviewGrandChild(BaseModel):
    id: Optional[int] = None
    text: Optional[List[str]] = None
    created_at: Optional[datetime.datetime] = None
    post_id: Optional[int] = None
    category: Optional[str] = None

    class Config:
        orm_mode = True


class PostPreviewChild(BaseModel):
    id: int
    author_id: int
    author_name: Optional[str] = None
    portrait_url: Optional[str] = None
    read_time: str
    created_at: str
    cover_image_path: Optional[str] = None
    slug: str
    tag: Optional[PostPreviewGrandChild] = None
    title: str

    class Config:
        orm_mode = True

    @validator('title')
    def title_case_title(cls, v):
        if not v:
            raise ValueError('not blog title wass returned')
        return v.lower().title()

    @validator('portrait_url')
    def portrait_is_url(cls, v):
        if isinstance(v, type(None)):
            return v
        if 'https://ianblog.s3' not in v:
            raise ValueError('Incorrect portrait url format (not s3)')
        return v

class PostPreviewOut(BaseModel):
    pagination: Dict
    posts: List[PostPreviewChild]

    class Config:
        orm_mode = True


class PostPreviewIn(BaseModel):
    tab: Optional[str] = None
    page: int
    direction: str
    start: int
    end: int
    limit: int

    @validator('direction')
    def validate_direction(cls, v):
        if v not in ['initial_load', 'next', 'prev']:
            raise ValueError('direction must be either "next" or "prev"')
        return v

    @validator('tab')
    def tab_is_alpha_only(cls, v):
        if not v.isalpha():
            raise ValueError('tab may only consist of alpha characters.')
        return v


class PostJsonType(BaseModel):
    type: str
    children: Optional[List] = None
    url: Optional[str] = None
    id: Optional[str] = None
    text: Optional[str] = None
    textAlign: Optional[str] = None
    caption: Optional[str] = None
    contentType: Optional[str] = None
    readtime: Optional[str] = None

    class Config:
        arbitrary_types_allowed = True

class NewPost(BaseModel):
    post: List[PostJsonType]

    @ classmethod
    def __get_validators__(cls):
        yield cls.validate_to_json

    @ classmethod
    def validate_to_json(cls, value):
        if isinstance(value, List):
            # pyright: reportGeneralTypeIssues=false
            return cls(**json.loads(value))
        return value

    class Config:
        orm_mode = True
