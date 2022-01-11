from core.config import settings
from app import crud
from app import schemas
# pyright: reportMissingModuleSource=false
from sqlalchemy.orm import Session


def init_db(db: Session) -> None:
    # pyright: reportGeneralTypeIssues=false
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.user.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.user.create(db, obj_in=user_in)
