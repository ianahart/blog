import functools
from typing import Optional, Dict, Union
import calendar
from sqlalchemy import update, select, func, distinct
from sqlalchemy.orm.session import Session
import datetime
from sqlalchemy.orm import joinedload, load_only, subqueryload
from sqlalchemy.sql.expression import extract
from app.models import Tag
from app.models import Post
from app.models import Like
from app.models import User
from app.models import Message


class Metric():
    def retrieve(self, admin_user_id: int, db: Session) -> Dict:
        try:
            metrics = {
                'visitors': {},
                'likes': [],
                'posts': {},
                'tags': {}
            }

            visitors = self.__visitors(db=db)
            metrics['visitors'] = {} if 'error' in visitors else visitors

            likes = self.__monthly_likes(admin_user_id=admin_user_id, db=db)
            metrics['likes'] = [] if 'error' in likes else likes

            posts = self.__yearly_posts(admin_user_id=admin_user_id, db=db)
            metrics['posts'] = {} if 'error' in posts else posts

            tags = self.__tags(admin_user_id, db=db)
            metrics['tags'] = {} if 'error' in tags else tags

            messages = self.__messages(admin_user_id=admin_user_id, db=db)
            metrics['messages'] = {} if 'error' in messages else messages
            return {
                'metrics': metrics,
            }
        except Exception as e:
            return {
                'error': 'Something went wrong retrieving admin dashboard metrics',
                'status': 500,
            }

    def __messages(self, admin_user_id: int, db: Session) -> Dict:

        try:

            today = datetime.datetime.utcnow()

            stmt = select(Message) \
                .options(
                    load_only(
                        Message.id, Message.created_at, Message.recipient_user_id)) \
                .where(Message.recipient_user_id == admin_user_id) \
                .where(extract('year', Message.created_at) == today.year)

            result = db.scalars(stmt).all()

            if len(result) == 0:
                return {
                    'messages': [],
                    'year': today.year
                }

            messages = [
                {
                    'month': calendar.month_abbr[val], 'messages': 0
                } for index, val in enumerate(range(1, 13))
            ]

            row_months = [calendar.month_abbr[row.created_at.month] for row in result]

            for message in messages:
                message['messages'] = row_months.count(message['month'])

            return {
                    'messages': messages,
                    'year': today.year
            }
        except Exception:
            return {
                'error': 'Something went wrong calculating messages metrics.',
                'status': 500
            }

    def __tags(self, admin_user_id: int, db: Session) -> Dict:
        try:
            stmt = select(Tag) \
                .join(Post, Tag.post) \
                .options(load_only(Tag.id, Tag.text)) \
                .order_by(Tag.id)\
                .where(Post.author_id == admin_user_id)

            result = db.scalars(stmt).all()

            if len(result) == 0:
                return {
                    'tags': [],
                    'unique': 0
                }

            tags = []
            full = tags

            for row in result:
                post_tags = row.text.split('|')
                tags += post_tags

            tags = list(set(tags))
            most_popular_tags = []

            for index, tag in enumerate(tags):
                most_popular_tags.append(
                    {
                        'name': tag,
                        'used': full.count(tag)
                    })

            most_popular_tags = sorted(
                most_popular_tags,
                key=lambda x: x['used'], reverse=True)[0:3]

            return {
                'result': most_popular_tags,
                'unique': len(tags),
                    }
        except Exception:
            return {
                'error': 'Something went wrong calculating tag metrics.',
                'status': 500
            }

    def __visitors(self, db: Session) -> Dict:
        try:
            stmt = select(func.count(distinct(Message.ip_address)))
            unique_visitors = db.scalar(stmt)

            return {
                'status': 'success',
                'result': unique_visitors
            }

        except Exception:
            return {
                'error': 'Something went wrong calculating visitor numbers.',
                'status': 500
            }

    def __yearly_posts(self, admin_user_id, db: Session) -> Dict:
        try:

            today = datetime.datetime.utcnow()
            today = today.strftime('%Y-%m-%d')
            data = {}

            for index, val in enumerate(range(1, 13)):
                month = calendar.month_abbr[val]
                data[month] = {'month': month, 'posts': 0}

            year, month, day = [int(el) for el in today.split('-')]

            stmt = select(Post) \
                .options(
                    load_only(Post.created_at, Post.id, Post.author_id)
            ) \
                .where(extract('year', Post.created_at) == year) \
                .where(Post.author_id == admin_user_id) \
                .order_by(Post.id.desc())

            result = db.scalars(stmt).all()

            if result:
                for row in result:
                    month = row.created_at.strftime('%b')
                    if month in data.keys():
                        data[month]['posts'] = data[month]['posts'] + 1

            data = list(data.values())
            total = functools.reduce(lambda x, y: x + y['posts'], data, 0)

            return {
                'calendar': data,
                'year': year,
                'total': total
            }

        except Exception:
            return {
                'error': 'Unable to retrieve yearly post data.',
                'status': 500
            }

    def __monthly_likes(self, admin_user_id: int, db: Session) -> Dict:
        try:

            calendar_data = {}
            today = datetime.datetime.utcnow()

            year, month, *_ = today.strftime("%Y-%m-%d").split('-')
            year, month = int(year), int(month)

            range_start, range_end = calendar.monthrange(year, month)

            for day, index in enumerate(range(range_end), range_start):
                calendar_data[day] = {'day': f'{today.strftime("%b")} {day}', 'likes': 0}

            stmt = select(Like) \
                .join(Post, Like.post) \
                .options(load_only(Like.created_at, Like.id)) \
                .where(extract('year', Like.created_at) == year) \
                .where(extract('month', Like.created_at) == month) \
                .where(Post.author_id == admin_user_id)

            result = db.scalars(stmt).all()

            if result:
                for row in result:
                    day = row.created_at.day
                    if day in list(calendar_data.keys()):
                        calendar_data[day]['likes'] = calendar_data[day]['likes'] + 1

            calendar_data = list(calendar_data.values())

            return {
                'status': 'success',
                'result': {
                    'calendar': calendar_data,
                    'year': year,
                    'month': today.strftime("%B")
                }
            }

        except Exception:
            return {
                'error': 'Something went wrong calculating monthly likes.',
                'status': 500
            }


admin_metric = Metric()
