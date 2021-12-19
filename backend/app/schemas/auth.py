from typing import Optional, List, Dict
from pydantic import BaseModel
import datetime


class AuthBase(BaseModel):
    pass


class AuthCredentials(AuthBase):
    name: Optional[str] = None
    value: Optional[str] = None
    error: str


class AuthLogin(AuthBase):
    credentials: List[AuthCredentials]
