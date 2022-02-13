release: alembic upgrade head
web: uvicorn --app-dir ./backend app.main:app --host=0.0.0.0 --port=${PORT:-5000}
