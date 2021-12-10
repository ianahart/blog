import { nanoid } from 'nanoid';
export const getNavLinks = () => {
  return [
    { label: 'Home', path: '/', id: nanoid() },
    { label: 'Posts', path: '/posts', id: nanoid() },
    { label: 'Categories', path: '/categories', id: nanoid() },
    { label: 'About', path: '/about', id: nanoid() },
    { label: 'Admin', path: '/admin/login', id: nanoid() }];
}
