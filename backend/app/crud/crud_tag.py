from app.models import Tag


class CRUDTag:
    def get_all_tags():
        return {'tags': '[tag1, tag2, tag3]'}


tag = CRUDTag()
