from sqlalchemy.orm.session import Session
from fastapi import APIRouter, HTTPException, Depends, Header


from app.api import deps
from app import schemas
from app import crud
from app.core.auth_bearer import JWTBearer
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

@router.get('/admin/', dependencies=[Depends(JWTBearer())],
            response_model=schemas.AllMessagesOut,
            status_code=200)
def get_messages(*, q_str: schemas.AllMessagesIn = Depends(),
                 db: Session = Depends(deps.get_db), authorization: str = Header(None)):
    data = crud.message.retrieve_messages(q_str=q_str, db=db, authorization=authorization)

    if isinstance(data, dict):
        if 'error' in data:
            detail = data['error']
            status_code = data['status']
            raise HTTPException(status_code=status_code, detail=detail)
        return {
                    'status': 'success',
                    'result': data,
        }
    raise HTTPException(status_code=500, detail="Unable to process client request.")
