import { useEffect } from 'react';
import axios from 'axios';
import { getLocalUser } from './helpers';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const WithAxios = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    const reqInterceptorId = axios.interceptors.request.use(
      (config) => {
        if (getLocalUser()?.accessToken) {
          config.headers.authorization = `Bearer ${getLocalUser().accessToken}`;
        } else {
          config.headers.authorization = '';
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptorId = axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          setUser((prevState) => ({
            ...prevState,
            accessToken: null,
            userId: null,
            authenticated: false,
          }));
          localStorage.removeItem('user');
          const user = localStorage.getItem('user');
          if (!user) {
            navigate('/admin/login');
          }
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axios.interceptors.response.eject(resInterceptorId);
      axios.interceptors.request.eject(reqInterceptorId);
    };
  }, [setUser, navigate]);
  return children;
};

export default WithAxios;
