from fastapi import APIRouter, Header, File, UploadFile, HTTPException, Depends, Form, Body  # noqa E501
from sqlalchemy.orm import Session
from app.crud.crud_post import post as CRUDPost
from app.core.auth_bearer import JWTBearer
from app.api import deps
from app import schemas


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
                      ):
    form_data = {
        'title': title,
        'post': post,
        'filename': filename,
        'author_id': authorid,
        'contentType': contentType,
        'read_time': readtime,
    }

    result = CRUDPost.create_post(db, form_data=form_data, file=file)

    if not result:
        raise HTTPException(
            400, detail="Something went wrong creating your post. Make sure all fields are filled out.")  # noqa E501

    return {'status': 'success', 'post_id': result, 'post': 'Blog post created'}


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
