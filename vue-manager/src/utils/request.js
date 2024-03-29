import axios from 'axios';

const baseURL = window.location.hostname === 'localhost'
  ? (window.location.host === 'localhost:8080' || window.location.host === 'localhost:8081' ? 'http://localhost:5000' : process.env.BASE_URL || 'http://localhost:5000')
  : `//${window.location.hostname}:${window.location.port}`;

const service = axios.create({
  baseURL,
  withCredentials: false,
  timeout: 300000,
});

service.interceptors.request.use(config => {
  if (!config.params) config.params = {};
  return config;
});

service.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default service;