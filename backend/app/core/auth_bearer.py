from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.core.security import decode_access_token, invalidate_token
from app.api import deps


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request, db: Session = Depends(deps.get_db)):

        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":

                raise HTTPException(

                    status_code=403, detail="Invalid authentication scheme.")

            if not self.verify_jwt(credentials.credentials, db):

                invalidate_token(credentials.credentials, db)

                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(
                status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, access_token: str, db) -> bool:

        isTokenValid: bool = False

        try:

            payload = decode_access_token(
                access_token=access_token, db=db)
        except:

            payload = None

        if payload:
            isTokenValid = True
        return isTokenValid
