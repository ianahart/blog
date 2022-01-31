from sqlalchemy import Column, Integer, DateTime, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Like(Base):  # type: ignore
    __tablename__ = 'like'
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('post.id', ondelete='CASCADE'), nullable=False)
    ip_address = Column(String(256), nullable=True)
    user_agent = Column(String(1999), nullable=True)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=True)
    post = relationship(
        'Post',
        back_populates='likes'
    )
