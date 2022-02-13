
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import os

load_dotenv()
url = None
if os.getenv('ENV') == 'production':
    url = os.getenv('DATABASE_URL')
    url = url.replace('postgres://', 'postgresql://') + "?sslmode=require"
else:
    url = settings.SQLALCHEMY_DATABASE_URI

engine = create_engine(url, future=True)

SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, future=True)
