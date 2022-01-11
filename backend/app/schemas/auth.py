from typing import Optional, List
#pyright: reportMissingImports=false
from pydantic import BaseModel


# pyright: reportGeneralTypeIssues=false


class AuthBase(BaseModel):
    pass


class AuthCredentials(AuthBase):
    name: Optional[str] = None
    value: Optional[str] = None
    error: str


class AuthLogin(AuthBase):
    credentials: List[AuthCredentials]
