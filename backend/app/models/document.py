from sqlalchemy import Column, Integer, String, Boolean, DateTime

from app.db.base_class import Base


class Document(Base):
    __tablename__ = 'document'
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False)
    password = Column(String, nullable=True)
    password_changed = Column(DateTime, nullable=False)
