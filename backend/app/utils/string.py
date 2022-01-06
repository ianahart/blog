class StringUtil:
    def slugify(self, string: str):
        return string.replace(' ', '-').strip()


string_util = StringUtil()
