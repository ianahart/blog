import typing as t
from sqlalchemy.ext.declarative import as_declarative

class_registry: t.Dict = {}


@as_declarative(class_registry=class_registry)
class Base:
    id: t.Any
    __name__: str

    def __tablename__(self, cls) -> str:
        return cls.__name__.lower()
