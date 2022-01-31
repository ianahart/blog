from sqlalchemy.orm.session import Session
from fastapi import APIRouter, HTTPException, Depends, Header


from app.api import deps
from app import schemas
from app.crud.crud_like import like as CRUDLike
router = APIRouter()

@router.post('/', status_code=201, response_model=schemas.LikeCreateOut)
def create_like(*,
                db: Session = Depends(deps.get_db),
                user_agent: str = Header(None),
                obj_in: schemas.LikeCreate
                ):

    data = CRUDLike.create_like(db, obj_in, user_agent)

    if isinstance(data, dict):
        if 'error' in data:
            status_code = data['status']

            raise HTTPException(status_code=status_code, detail=data['error'])

    return {'status': 'success', 'data': data}


@router.delete('/{like_id}/', status_code=200)
def delete_like(*, like_id: int, db: Session = Depends(deps.get_db)):
    data = CRUDLike.delete_like(like_id, db)

    if isinstance(data, dict):
        if 'error' in data:
            status_code = int(data['status'])

            raise HTTPException(status_code=status_code, detail=data['error'])

    return {'status': 'success', 'data': data['msg']}
