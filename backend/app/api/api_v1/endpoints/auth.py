from typing import Any, Optional

from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session

router = APIRouter()


@router.post('/logout')
def logout():
    return {'status': 'user logged out!'}


@router.post('/login')
def login():
    return {'status': 'user logged in!'}
