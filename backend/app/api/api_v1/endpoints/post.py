from fastapi import APIRouter, File, UploadFile, HTTPException, Depends, Form, Body  # noqa E501
from sqlalchemy.orm import Session
from app.crud.crud_post import post as CRUDPost
from app.core.auth_bearer import JWTBearer
from app.api import deps
from app import schemas


router = APIRouter()


@router.get('/', dependencies=[Depends(JWTBearer())])
def get_posts(*, db: Session = Depends(deps.get_db)):
    all_posts = CRUDPost.get_all_posts(db)
    return all_posts


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
