from typing import Union
import botocore
from dotenv import load_dotenv
import boto3
from pathlib import Path
import os
import base64
import uuid
import random
from datetime import datetime


load_dotenv()


class AwsSdk:
    def __init__(self, access_key: str, secret_access_key: str, bucket_name: str, region_name: str) -> None:  # noqa E501
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
        return file['url'] if url is None else url

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
        filename = filename.replace('"', '')
        content_type = post_el['contentType'].replace('"', '')
        # pyright: reportGeneralTypeIssues=false
        obj = self.s3.Object(self.bucket_name, filename)
        obj.put(
            Body=post_el['url'],
            ACL='public-read',
            ContentType=content_type
        )

        object_url = f"https://{self.bucket_name}.s3.{self.region_name}.amazonaws.com/{filename}"  # noqa E501
        return object_url, filename

    def upload_avatar(self, avatar, file_bytes, folder) -> Union[str, bool]:
        try:
            path = Path(avatar.filename)
            content_type = 'image/' + path.suffix.split('.')[1]

            date = datetime.utcnow().strftime('%Y%m%d%H%M%SZ')
            filename = f'{date}-{random.randint(10000, 100000)}-{path}'

            obj = self.s3.Object(self.bucket_name, f'{folder}/{filename}')
            obj.put(
                Body=file_bytes,
                ACL='public-read',
                ContentType=content_type,
            )

            portrait_url = f"https://{self.bucket_name}.s3.{self.region_name}.amazonaws.com/{folder}/{filename}"  # noqa E501
            return portrait_url, filename

        except Exception as e:
            print(e)
            return False

    def file_size_exceeded(self, file_bytes) -> bool:
        try:

            return True if len(file_bytes) > 2000000 else False
        except:  # noqa E722
            return False

    def delete_file(self, folder: str, filename: str) -> None:
        try:
            if len(folder):
                self.s3.Object(self.bucket_name, f'{folder}/{filename}').delete()
            else:
                self.s3.Object(self.bucket_name, f'{filename}').delete()
        except Exception as e:
            print(e)

    def get_file(self, filename: str):
        try:
            bucket = self.s3.Bucket(self.bucket_name)

            for obj in bucket.objects.all():

                if obj.key == filename:
                    return filename
        except botocore.exceptions.ClientError as e:
            print(e)
            return None

aws = AwsSdk(
    os.getenv('AWS_ACCESS_KEY_ID'),
    os.getenv('AWS_SECRET_ACCESS_KEY'),
    os.getenv('AWS_BUCKET'),
    os.getenv('AWS_DEFAULT_REGION')
)
