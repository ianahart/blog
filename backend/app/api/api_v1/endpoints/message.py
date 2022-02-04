from sqlalchemy.orm.session import Session
from fastapi import APIRouter, HTTPException, Depends, Header


from app.api import deps
from app import schemas
from app import crud
router = APIRouter()


@router.post('/', status_code=201, response_model=schemas.MessagePostOut)
def create_message(*, db: Session = Depends(deps.get_db), form_data: schemas.MessagePostIn):

    data = crud.message.create_message(db, form_data)

    if isinstance(data, dict):
        if 'error' in data:

            detail = data['error']
            raise HTTPException(status_code=404, detail=detail)
        return {
                'status': 'success',
                'result': data,
        }
    return {'msg': 'message sent'}
