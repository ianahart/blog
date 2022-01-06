from typing import Optional, Union
from dotenv import load_dotenv
import boto3
import os
import base64
import uuid
from datetime import datetime


load_dotenv()


class AwsSdk:
    def __init__(self, access_key: str, secret_access_key: str, bucket_name: str, region_name: str) -> None:
        self.bucket_name = bucket_name
        self.region_name = region_name
        session = boto3.Session(
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_access_key,
            region_name=self.region_name
        )

        self.s3 = session.resource('s3')

    def file_decoding(self, file: dict) -> Union[bytes, str]:
        url = None
        if isinstance(file['url'], str):
            url = base64.b64decode(
                file['url'].split(';base64,')[1])

        return file['url'] if url == None else url

    def create_filename(self, file: dict) -> str:
        date = datetime.utcnow().strftime('%Y%m%d%H%M%SZ')
        caption = file['caption'].replace(
            ' ', '_') if 'caption' in file else None

        if not caption:
            caption = uuid.uuid1()

        identifier = str(caption) + date

        ext = file['contentType'].split('/')[1]
        return f'{identifier}.{ext}'

    def upload_file(self, post_el: dict):

        try:
            post_el['url'] = self.file_decoding(post_el)

        except TypeError:
            TypeError('Invalid image')

        filename = self.create_filename(post_el)

        obj = self.s3.Object(self.bucket_name, filename)
        obj.put(
            Body=post_el['url'],
            ACL='public-read',
            ContentType='image/jpeg'
        )

        object_url = f"https://{self.bucket_name}.s3.{self.region_name}.amazonaws.com/{filename}"
        return object_url, filename


aws = AwsSdk(
    os.getenv('AWS_ACCESS_KEY_ID'),
    os.getenv('AWS_SECRET_ACCESS_KEY'),
    os.getenv('AWS_BUCKET'),
    os.getenv('AWS_DEFAULT_REGION')
)