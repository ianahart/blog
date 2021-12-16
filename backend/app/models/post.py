from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship


from app.db.base_class import Base


class Post(Base):
    __tablename__ = 'post'
    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    created_at = Column(DateTime, nullable=False)
    slug = Column(String(256), nullable=False)
    text_path = Column(String(256), nullable=False)
    text_filename = Column(String(256), nullable=False)
    image_filename = Column(String(256), nullable=False)
    image_path = Column(String(256), nullable=False)
    words = Column(Integer, nullable=True)
    read_time = Column(String(32), nullable=True)
    author = relationship('User', back_populates='posts')
    tags = relationship(
        'Tag',
        cascade="all,delete-orphan",
        back_populates='post')
