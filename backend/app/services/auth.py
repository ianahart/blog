from typing import Optional, Dict
from sqlalchemy.orm import Session

from app.schemas.auth import AuthLogin
from app import utils, models
from app.core.security import verify_password


class Auth:

    def authenticate(self, db: Session, credentials: AuthLogin) -> Dict:
        auth_creds = {}
        auth_status = {
            'error': None,
            'data': {'authenticated': False, 'access_token': None}
        }

        for row in credentials.dict()['credentials']:
            if row['name'] in ['email', 'password']:
                auth_creds[row['name']] = row['value']

        msg = utils.validate.strict_password(auth_creds['password'])

        if len(msg) > 0:
            auth_status['error'] = utils.error.message(msg, 'password')
            return auth_status

        user = db.query(models.User).where(
            models.User.email == auth_creds['email']).first()
        print(user)
        if not user:
            auth_status['error'] = utils.error.message(
                'User not found.', 'password')
            return auth_status

        if verify_password(auth_creds['password'], user.hashed_password):
            auth_status['data']['authenticated'] = True
            auth_status['data']['access_token'] = 'access_token here'
            return auth_status
        else:
            auth_status['error'] = utils.error.message(
                'Credentials are invalid.', 'password')
            return auth_status


auth = Auth()
