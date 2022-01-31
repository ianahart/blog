from typing import Dict
from sqlalchemy.orm import Session


from app.schemas.auth import AuthLogin
from app import utils, models
from app.core import security, config
import socket

class Auth:

    def authenticate(self, db: Session, credentials: AuthLogin) -> Dict:
        auth_creds = {}
        auth_status = {
            'error': None,
            'data': {
                'authenticated': False,
                'avatarUrl': None,
                'accessToken': None,
                'userId': None,
                'email': None,
                'firstName': None,
                'lastName': None,
            }
        }

        for row in credentials.dict()['credentials']:
            if row['name'] in ['email', 'password']:
                auth_creds[row['name']] = row['value']

        msg = utils.validate.strict_password(auth_creds['password'])

        if len(msg) > 0:
            auth_status['error'] = utils.error.message(msg, 'password')
            return auth_status
        # pyright: reportGeneralTypeIssues=false
        user = db.query(models.User).where(
            models.User.email == auth_creds['email']).first()

        if not user:
            auth_status['error'] = utils.error.message(
                'User not found.', 'password')
            return auth_status

        if security.verify_password(auth_creds['password'], user.hashed_password):  # noqa E501
            auth_status['data']['authenticated'] = True
            # pyright: reportGeneralTypeIssues=false
            access_token = security.create_access_token(
                subject=user.id,
                expires_delta=config.settings.ACCESS_TOKEN_EXPIRE_MINUTES)

            security.save_access_token(db=db,
                                       subject=user.id,
                                       access_token=access_token)

            auth_status['data']['accessToken'] = access_token
            auth_status['data']['userId'] = user.id
            auth_status['data']['email'] = user.email
            auth_status['data']['firstName'] = user.first_name
            auth_status['data']['lastName'] = user.last_name

            if user.portrait_url:
                auth_status['data']['avatarUrl'] = user.portrait_url
            return auth_status
        else:
            auth_status['error'] = utils.error.message(
                'Credentials are invalid.', 'password')
            return auth_status

    def extract_ip(self):
        st = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            st.connect(('10.255.255.255', 1))
            IP = st.getsockname()[0]
        except Exception:
            IP = '127.0.0.1'
        finally:
            st.close()
        return IP

auth = Auth()
