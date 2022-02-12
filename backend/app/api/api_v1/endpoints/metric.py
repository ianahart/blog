from sqlalchemy.orm.session import Session
from fastapi import APIRouter, HTTPException, Depends, Header
from app.core.auth_bearer import JWTBearer
from app.api import deps
from app import schemas
from app.admin import admin_metric
router = APIRouter()

@router.get('/{admin_user_id}/',
            dependencies=[Depends(JWTBearer())], response_model=schemas.MetricOut,
            status_code=200)
def retrieve_metrics(*, admin_user_id: int, db: Session = Depends(deps.get_db)):

    data = admin_metric.retrieve(admin_user_id, db)

    if isinstance(data, dict):
        if 'error' in data:

            detail = data['error']
            raise HTTPException(status_code=404, detail=detail)
        return {
                'status': 'success',
                'data': data,
        }
