from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship


from app.db.base_class import Base

# pyright: reportGeneralTypeIssues=false


class Token(Base):
    __tablename__ = 'token'
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False)
    token_valid_from = Column(DateTime, nullable=True)
    token_valid_to = Column(DateTime, nullable=True)
    access_token = Column(String, nullable=True)
    user_role_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    user = relationship('User', back_populates='token')
