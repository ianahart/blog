import datetime
from typing import Dict, Optional, List
from pydantic import BaseModel, validator


class TagBase(BaseModel):
    id: int
    post_id: int
    created_at: Optional[datetime.datetime]
    text: str
    category: Optional[str] = None

class RetrieveTagsIn(BaseModel):
    offset: int
    limit: int


class RetrieveTagsOutGreatGrandChild(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    portrait_url: Optional[str] = None
    id: int

    class Config:
        orm_mode = True


class RetrieveTagsOutGrandChild(BaseModel):
    created_at: Optional[datetime.datetime] = None
    id: int
    slug: str
    title: str
    readable_date: str
    author: RetrieveTagsOutGreatGrandChild

    class Config:
        orm_mode = True


class RetrieveTagsOutChild(BaseModel):
    category: Optional[str] = None
    created_at: Optional[datetime.datetime] = None
    id: Optional[int] = None
    post: RetrieveTagsOutGrandChild
    post_id: int
    text: List[str]

    class Config:
        orm_mode = True


class RetrieveTagsOut(BaseModel):
    q_str: Optional[str] = None
    status: str
    tags: List[RetrieveTagsOutChild]

    class Config:
        orm_mode = True


class AddTagChild(BaseModel):
    id: str
    value: str

    @validator('value')
    def tag_is_only_letters(cls, v):
        if not all(s.isalpha() or s.isspace() for s in v):
            raise ValueError('A tag may only consist of letters.')
        elif len(v) > 75:
            raise ValueError('A tag may not exceed 75 characters.')
        return v.title()

class AddTag(BaseModel):
    tags: List[AddTagChild]
    post_id: int

    class Config:
        orm_mode = True


class UpdateTagChild(BaseModel):
    id: str
    value: str

    @validator('value')
    def tag_is_only_letters(cls, v):
        if not all(s.isalpha() or s.isspace() for s in v):
            raise ValueError('A tag may only consist of letters.')
        elif len(v) > 75:
            raise ValueError('A tag may not exceed 75 characters.')
        return v.title()


class UpdateTag(BaseModel):
    tags: List[UpdateTagChild]
    post_id: int

    class Config:
        orm_mode = True
