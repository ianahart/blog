
import re


class Validator:

    def email(self, email: str) -> str:
        matched = re.match(
            "^.+@(\[?)[a-zA-Z0-9-.]+.([a-zA-Z]{2,3}|[0-9]{1,3})(]?)$",
            email)

        matched = bool(matched)

        return ''if matched and len(email) > 0 else 'Please provide a valid email address'

    def strict_password(self, password: str) -> str:

        checks = {
            'upper': False,
            'lower': False,
            'integer': False,
            's_chars': False,
        }

        for idx in range(len(password)):
            if password[idx].isdigit():
                checks['integer'] = True
            if password[idx].upper() == password[idx] and not password[idx].isdigit():
                checks['upper'] = True

            if password[idx].lower() == password[idx] and not password[idx].isdigit():
                checks['lower'] = True
            if any(ch for ch in password if not ch.isalnum()):
                checks['s_chars'] = True

        passed = all(check for check in checks.values())

        return '' if passed and len(password) > 12 else 'Password must be greater than 12 characters, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.'


validate = Validator()
