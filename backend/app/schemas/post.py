from typing import Optional, List
# pyright: reportMissingImports=false
from pydantic import BaseModel
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


class PostJsonType(BaseModel):
    type:  str
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

    @classmethod
    def __get_validators__(cls):
        yield cls.validate_to_json

    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, List):
            # pyright: reportGeneralTypeIssues=false
            return cls(**json.loads(value))
        return value

    class Config:
        orm_mode = True
