from repositories import user


class UserResource:
    def get_users(self):
        return [{"username": "Ian"}, {"username": "Alex Hart"}]
