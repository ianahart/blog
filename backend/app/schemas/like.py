import datetime
from typing import Optional, Dict
from pydantic import BaseModel, validator
class LikeBase(BaseModel):
    id: int
    post_id: int
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime]
    ip_address: str
    user_agent: str


class LikeCreate(BaseModel):
    post_id: int


class LikeCreateOut(BaseModel):
    data: Dict
    status: Optional[str] = None
