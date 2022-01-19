import datetime
from typing import Dict, Optional, List
from pydantic import BaseModel, validator


class TagBase(BaseModel):
    id: int
    post_id: int
    created_at: Optional[datetime.datetime]
    text: str
    category: Optional[str] = None

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
