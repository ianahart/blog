from repositories import post


class PostResource:
    def get_posts(self):
        return [{"username": "an introduction to Java springboot"}, {"author": "Ian Hart"}]
