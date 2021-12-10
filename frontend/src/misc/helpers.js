
export const applyRules = (form, field, formatted) => {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
    const map = Object.assign({},  ...form.map((field, index) => ({ [field.name]: index })));

    switch (field.name) {
      case 'username':
              console.log(formatted)
        if (!form[0].value.trim().length) {
          form[map[field.name]].error = `${formatted} cannot be empty.`;
        } else if (!emailPattern.test(form[map[field.name]].value)) {
          form[map[field.name]].error =`${formatted} is not a valid email address.`;
        }
        console.log(form)
        break;
      case 'temp_password':
          if (form[map[field.name]].value.trim().length === 0) {
            form[map[field.name]].error = `${formatted} cannot be empty.`;
        }
        break;
      case 'password':
        if (form[map[field.name]].value.trim().length < 12) {
          form[map[field.name]].error = `${formatted} must be a minimum of 12 characters.`
        } else if (!passwordPattern.test(form[map[field.name]].value)) {
          form[map[field.name]].error =  `${formatted} must include 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.`;
        }
        break;
      default:
        form[map[field.name]].error = '';
    }
}

export const findNeedle = (haystack, needle, key) => {
  return haystack.findIndex(item => item[key] === needle);
}