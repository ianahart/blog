import datetime
from typing import Optional, Dict, List
from pydantic import BaseModel, validator


class LikesMetricData(BaseModel):
    calendar: List
    year: Optional[int] = None
    month: Optional[str] = None

    class Config:
        orm_mode = True

class LikesMetric(BaseModel):
    status: Optional[str] = None
    result: LikesMetricData

    class Config:
        orm_mode = True


class MessagesMetricChild(BaseModel):
    month: Optional[str] = None
    messages: Optional[int] = None

    class Config:
        orm_mode = True

class MessagesMetric(BaseModel):
    messages: List[Optional[MessagesMetricChild]]
    year: Optional[int] = None

    class Config:
        orm_mode = True


class PostsMetricChild(BaseModel):
    month: Optional[str] = None
    posts: Optional[int] = None

    class Config:
        orm_mode = True

class PostsMetric(BaseModel):
    calendar: List[Optional[PostsMetricChild]]
    total: Optional[int] = None
    year: Optional[int] = None

    class Config:
        orm_mode = True


class TagsMetricChild(BaseModel):
    name: Optional[str] = None
    used: Optional[int] = None

    class Config:
        orm_mode = True

class TagsMetric(BaseModel):
    result: TagsMetricChild
    unique: Optional[int] = None

    class Config:
        orm_mode = True

class VisitorsMetric(BaseModel):
    status: Optional[str] = None
    result: Optional[int] = None

class MetricDicts(BaseModel):
    likes: Dict
    messages: Dict
    posts: Dict
    tags: Dict
    visitors: Dict

    class Config:
        orm_mode = True


class MetricContainer(BaseModel):
    metrics: Dict

    class Config:
        orm_mode = True


class MetricOut(BaseModel):
    data: MetricContainer

    class Config:
        orm_mode = True
