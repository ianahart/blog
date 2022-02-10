from typing import Optional, List, Dict, Tuple, Union
from pydantic import BaseModel, validator
import datetime
import json
import re

from pydantic.typing import NoneType


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


class LatestPostOutChild(BaseModel):
    id: int
    title: str
    created_at: Optional[datetime.datetime] = None
    cover_image_path: Optional[str] = None
    content: str
    slug: str

    class Config:
        orm_mode = True


class LatestPostOut(BaseModel):
    status: Optional[str] = None
    latest_post: LatestPostOutChild

    class Config:
        orm_mode = True

class LatestPostIn(BaseModel):
    size: int

class SearchPostOutGrandChild(BaseModel):
    id: int
    title: str
    slug: str
    cover_image_path: Optional[str] = None

    class Config:
        orm_mode = True


class SearchPostOutChild(BaseModel):
    id: int
    post: SearchPostOutGrandChild
    text: List[str]

    class Config:
        orm_mode = True

class SearchPostOut(BaseModel):
    results: List[SearchPostOutChild]

    class Config:
        orm_mode = True

class SearchPostIn(BaseModel):
    q: str

class RandomPostOut(BaseModel):
    size: Optional[int] = None
    user: Optional[int] = None


class PostRankOut(BaseModel):
    result: Optional[Dict] = None

class GetPostOutChild(BaseModel):
    author: dict
    author_id: int
    content: Dict[str, List]
    cover_image_filename: Optional[str] = None
    cover_image_path: Optional[str] = None
    created_at: str
    is_edited: Optional[bool] = None
    user_has_liked: bool
    like_count: int
    like_id: Optional[int] = None
    id: int
    read_time: str
    slug: str
    tags: List[str]
    tag_id: int
    title: str


class GetPostOut(BaseModel):
    status: str
    retrieved_post: GetPostOutChild

    class Config:
        orm_mode = True


class GetPostIn(BaseModel):
    slug: str

    @validator('slug')
    def slug_is_only_numbers_letters_hyphens(cls, v):
        matched = re.match(r"/^[0-9A-Za-z\s\- ] +$/")
        matched = bool(matched)

        if matched:
            raise ValueError('Malformed slug in the Url')
        return v

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
    like_count: int
    user_has_liked: bool = False
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
    page: Optional[int] = None
    direction: Optional[str] = None
    start: Optional[int] = None
    total: Optional[int] = None
    limit: Optional[int] = None

    @validator('direction')
    def validate_direction(cls, v):
        if v:
            if v not in ['initial_load', 'next', 'prev']:
                raise ValueError('direction must be either "next" or "prev"')
            return v

    @validator('tab')
    def tab_is_alpha_only(cls, v):
        if v:
            if not v.isalpha():
                raise ValueError('tab may only consist of alpha characters.')
            return v

class AdminPostPreviewIn(BaseModel):
    size: int = 0
    total: int = 0

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
    tags: Optional[str] = None

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

class PostUpdate(BaseModel):
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
