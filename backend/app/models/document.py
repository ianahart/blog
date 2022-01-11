
# pyright: reportMissingImports=false
# pyright: reportMissingModuleSource=false
from sqlalchemy import Column, Integer, String, DateTime
from app.db.base_class import Base

# pyright: reportGeneralTypeIssues=false
class Document(Base):
    __tablename__ = 'document'
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False)
    password = Column(String, nullable=True)
    password_changed = Column(DateTime, nullable=False)
