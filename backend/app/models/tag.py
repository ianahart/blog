# pyright: reportMissingImports=false
# pyright: reportMissingModuleSource=false
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship


from app.db.base_class import Base

# pyright: reportGeneralTypeIssues=false


class Tag(Base):
    __tablename__ = 'tag'
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('post.id'), nullable=False)
    created_at = Column(DateTime, nullable=False)
    text = Column(String(128), nullable=True)
    category = Column(String(128), nullable=True)
    post = relationship('Post', back_populates='tags')
