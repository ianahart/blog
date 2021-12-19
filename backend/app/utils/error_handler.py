from typing import Optional, List


class ErrorHandler:
    def message(self, msg: str, field: str) -> List:
        detail = [{'loc': ['body', field], 'msg': msg}]

        return detail


error = ErrorHandler()
