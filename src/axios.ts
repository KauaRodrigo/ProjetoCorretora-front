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
    if (window.location.pathname != '/' && error.response && error.response.status === 401) {
      window.location.pathname = '/';
    }
    return Promise.reject(error);
  }
);

             

export default api;