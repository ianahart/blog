from sqlalchemy.orm.session import Session
from fastapi import APIRouter, HTTPException, Depends, Header


from app.api import deps
from app import schemas
from app import crud
from app.core.auth_bearer import JWTBearer
router = APIRouter()


@router.delete('/{message_id}/admin/', dependencies=[Depends(JWTBearer())],
               response_model=schemas.MessageDeleteOut,
               status_code=200
               )
def delete_message(*, message_id: int, db: Session = Depends(deps.get_db)):
    data = crud.message.delete_message(message_id, db)
    if isinstance(data, dict):
        if 'error' in data:
            detail = data['error']
            status_code = data['status']

            raise HTTPException(status_code=status_code, detail=detail)
        return data


@router.patch('/{message_id}/admin/',
              dependencies=[Depends(JWTBearer())],
              response_model=schemas.MessageUpdateOut,
              status_code=200)
def update_message(*, message_id: int,
                   db: Session = Depends(deps.get_db),
                   body: schemas.MessageUpdateIn
                   ):

    data = crud.message.update_message(message_id, db, body)

    if isinstance(data, dict):
        if 'error' in data:
            detail = data['error']
            status_code = data['status']

            raise HTTPException(status_code=status_code, detail=detail)
        return data

@router.delete('/admin/', dependencies=[Depends(JWTBearer())],
               response_model=schemas.MessagesDeleteOut,
               status_code=200)
def delete_messages(*, q_str: schemas.MessagesDeleteIn = Depends(),
                    db: Session = Depends(deps.get_db)):
    data = crud.message.delete_messages(db, q_str)

    if isinstance(data, dict):
        if 'error' in data:
            detail = data['error']
            status_code = data['status']

            raise HTTPException(status_code=status_code, detail=detail)
        return data


@router.post('/admin/', dependencies=[Depends(JWTBearer())], status_code=200,
             response_model=schemas.MessagesUpdateOut)
def update_messages(*, db: Session = Depends(deps.get_db), model: schemas.MessagesUpdateIn):
    data = crud.message.update_messages(db, model)

    if isinstance(data, dict):
        if 'error' in data:
            detail = data['error']
            status_code = data['status']

            raise HTTPException(status_code=status_code, detail=detail)
        return data


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
