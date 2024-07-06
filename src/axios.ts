import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

if (token && user) {
  api.defaults.headers['Authorization'] = 'Bearer ' + token
  api.defaults.headers['user'] = user
}

api.interceptors.response.use(
  response => response,
  error => {
    if (window.location.href != '/' && error.response && error.response.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

             

export default api;