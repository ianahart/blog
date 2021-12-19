import { loginErrors } from "./data";

export const emailRules = (email) => {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let error = '';
    if (!email.trim().length) {
      error = loginErrors.email.empty;
    } else if (!emailPattern.test(email)) {
      error = loginErrors.email.inValid;
    }
    return error;
};

export const applyRules = (form, field) => {
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
    const map = Object.assign({},  ...form.map((field, index) => ({ [field.name]: index })));
    form[map[field.name]].error = '';
    switch (field.name) {
      case 'email':
        form[map[field.name]].error  =  emailRules(form[map[field.name]].value);
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

