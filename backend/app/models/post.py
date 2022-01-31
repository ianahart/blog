from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.mutable import MutableDict

from app.db.base_class import Base


class Post(Base):  # type: ignore
    __tablename__ = 'post'
    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    is_edited = Column(Boolean, nullable=True, default=0)
    created_at = Column(DateTime, nullable=False)
    title = Column(String, nullable=True)
    slug = Column(String(256), nullable=True)
    cover_image_filename = Column(String(256), nullable=True)
    cover_image_path = Column(String(256), nullable=True)
    content = Column(MutableDict.as_mutable(JSON))
    read_time = Column(String(64), nullable=True)
    author = relationship('User', back_populates='posts')
    tag = relationship(
        'Tag',
        cascade="all,delete-orphan",
        uselist=False,
        primaryjoin="Post.id == Tag.post_id",
        back_populates='post')
    likes = relationship(
                 'Like',
                 primaryjoin="Post.id == Like.post_id",
                 back_populates="post")
