import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',//tells Axios that all relative URLs used in requests made with this instance should be prefixed with http://localhost:3000
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
