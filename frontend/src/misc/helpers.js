import { loginErrors } from "./data";

export const userNameRules = (userName) => {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let error = '';
    if (!userName.trim().length) {
      error = loginErrors.userName.empty;
    } else if (!emailPattern.test(userName)) {
      error = loginErrors.userName.inValid;
    }
    return error;
};

export const applyRules = (form, field) => {
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
    const map = Object.assign({},  ...form.map((field, index) => ({ [field.name]: index })));

    switch (field.name) {
      case 'username':
        form[map[field.name]].error  =  userNameRules(form[map[field.name]].value);
        break;
      case 'temp_password':
          if (form[map[field.name]].value.trim().length === 0) {
            form[map[field.name]].error = loginErrors.temp_password.empty;
        }
        break;
      case 'password':
        if (form[map[field.name]].value.trim().length < 12) {
          form[map[field.name]].error = loginErrors.password.min;
        } else if (!passwordPattern.test(form[map[field.name]].value)) {
          form[map[field.name]].error =  loginErrors.password.regex;
        }
        break;
      default:
        form[map[field.name]].error = '';
    }
}

export const findNeedle = (haystack, needle, key) => haystack.findIndex(item => item[key] === needle);

