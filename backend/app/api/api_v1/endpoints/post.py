from fastapi import APIRouter, Header, File, UploadFile, HTTPException, Depends, Form, Body  # noqa E501
from sqlalchemy.orm import Session
from app.crud.crud_post import post as CRUDPost
from app import crud
from app.core.auth_bearer import JWTBearer
from app.api import deps
from app import schemas
from fastapi.encoders import jsonable_encoder
import json

from app.schemas.tag import AddTag

router = APIRouter()

@router.get('/',
            response_model=schemas.PostPreviewOut)
def get_posts(*, db: Session = Depends(deps.get_db),
              q_string: schemas.PostPreviewIn = Depends()):

    data = CRUDPost.retrieve_all_posts(db, q_string)

    if isinstance(data, dict):

        if 'error' in data:

            detail = data['error']
            raise HTTPException(status_code=404, detail=detail)
    return {'posts': data['posts'], 'pagination': data['pagination']}


@router.post('/admin/', dependencies=[Depends(JWTBearer())], status_code=200)
async def create_post(*, db: Session = Depends(deps.get_db),
                      file: UploadFile = File(...),
                      filename: str = Form(...),
                      contentType: str = Form(...),
                      title: str = Form(...),
                      authorid: str = Form(...),
                      post: schemas.NewPost = Body(...),
                      readtime: str = Form(...),
                      tags: str = Form(...),
                      ):
    form_data = {
        'title': title,
        'post': post,
        'tags': tags,
        'filename': filename,
        'author_id': authorid,
        'contentType': contentType,
        'read_time': readtime,
    }

    try:
        lst = json.loads(tags)
        # make sure it is of pydantic schema
        AddTag.parse_obj({'post_id': 0, 'tags': lst})

    except Exception:
        raise HTTPException(422, detail="Tags are invalid format")

    result = CRUDPost.create_post(db, form_data=form_data, file=file)

    if not result:
        raise HTTPException(
            400, detail="Something went wrong creating your post. Make sure all fields are filled out.")  # noqa E501

    tag_model = AddTag.parse_obj({'post_id': result, 'tags': lst})
    data = crud.tag.create_tags(db, tag_model)

    if isinstance(data, dict):
        if 'error' in data:
            status_code = int(data['status'])
            detail = jsonable_encoder({'error': data['error'], 'post_id': result})
            raise HTTPException(status_code=status_code, detail=data['error'])

    return {'status': 'success', 'post_id': result, 'post': 'Blog post created'}


@router.delete('/{post_id}/admin/', dependencies=[Depends(JWTBearer())], status_code=200)
def delete_post(*, post_id: int, db: Session = Depends(deps.get_db)):
    data = CRUDPost.delete_post(post_id, db)

    if isinstance(data, dict):
        if 'error' in data:
            status_code = int(data['status'])
            raise HTTPException(status_code=status_code, detail=data['error'])

    return {'success': 'Post has been deleted'}

@router.put('/{post_id}/admin/', dependencies=[Depends(JWTBearer())], status_code=200)
async def update_post(*, post_id: int, db: Session = Depends(deps.get_db),
                      file: UploadFile = File(None),
                      filename: str = Form(...),
                      contentType: str = Form(...),
                      title: str = Form(...),
                      authorid: str = Form(...),
                      post: schemas.NewPost = Body(...),
                      readtime: str = Form(...),
                      ):

    form_data = {
        'title': title,
        'post': post,
        'filename': filename,
        'author_id': authorid,
        'contentType': contentType,
        'read_time': readtime.replace('"', ''),
        'file': file
    }

    data = CRUDPost.update_post(db, form_data, post_id)

    if isinstance(data, dict):
        if 'error' in data:
            status_code = int(data['status'])
            raise HTTPException(status_code=status_code, detail=data['error'])

    return {'status': 'success', 'result': data}


@router.get('/admin/{user_id}/',
            dependencies=[Depends(JWTBearer())],
            response_model=schemas.PostPreviewOut,
            status_code=200)
def get_admin_posts(*,
                    user_id: int,
                    db: Session = Depends(deps.get_db),
                    authorization: str = Header(None),
                    q_string: schemas.AdminPostPreviewIn = Depends()
                    ):

    data = CRUDPost.retrieve_admin_posts(db, user_id, authorization, q_string)

    if 'error' not in data:
        return {'posts': data['posts'], 'pagination': data['pagination']}

    else:
        raise HTTPException(status_code=data['status_code'], detail=data['error'])


@router.get('/{slug}/', status_code=200, response_model=schemas.GetPostOut)
def get_post(*, slug, db: Session = Depends(deps.get_db)):

    data = CRUDPost.retrieve_post(slug, db)

    if isinstance(data, dict):
        if 'error' in data:
            detail = data['error']
            raise HTTPException(status_code=data['status'], detail=data['error'])

    post = jsonable_encoder(data['post'])
    return {'status': 'success', 'retrieved_post': post}
