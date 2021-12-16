from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False)
    email = Column(String(128), nullable=False)
    hashed_password = Column(String, nullable=False)
    token = Column(String(256), nullable=True)
    temp_password = Column(String(128), nullable=True)
    temp_password_changed = Column(Boolean, nullable=True, default=0)
    first_name = Column(String(256), nullable=True)
    last_name = Column(String(256), nullable=True)
    slug = Column(String(256), nullable=True)
    last_login = Column(DateTime, nullable=True)
    is_logged_in = Column(Boolean, nullable=True, default=0)
    posts = relationship(
        'Post', cascade="all,delete-orphan",
        back_populates="author")
