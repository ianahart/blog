import { nanoid } from 'nanoid';
export const getNavLinks = () => {
  return [
    { label: 'Home', path: '/', id: nanoid() },
    { label: 'Posts', path: '/posts', id: nanoid() },
    { label: 'Categories', path: '/categories', id: nanoid() },
    { label: 'About', path: '/about', id: nanoid() },
    { label: 'Admin', path: '/admin/login', id: nanoid() }];
}

export const loginErrors = {
  password: {
    min: 'Password must be a minimum of 12 characters.',
    regex: 'Password must include 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.'
  },
  userName: {
    empty: 'Username cannot be empty.',
    inValid: 'Username is not a valid email address.'
  },
  temp_password: {
    empty: 'Temp password cannot be empty.'
  },
}