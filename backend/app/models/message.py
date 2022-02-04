from sqlalchemy import Column, Integer, ForeignKey, Text, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Message(Base):  # type: ignore
    __tablename__ = 'message'
    id = Column(Integer, primary_key=True, index=True)
    recipient_user_id = Column(Integer, ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    post_id = Column(Integer, ForeignKey('post.id', ondelete='CASCADE'), nullable=False)
    read = Column(Boolean, nullable=True, default=0)
    message = Column(Text, nullable=True)
    ip_address = Column(String, nullable=True)
    sender = Column(String(256), nullable=True)
    contact = Column(String(256), nullable=True)
    type_contact = Column(String(256), nullable=True)
    created_at = Column(DateTime, nullable=False)
    recipient = relationship(
        'User',
        back_populates="messages"
    )
    post = relationship('Post', back_populates='messages')
