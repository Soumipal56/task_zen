import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // CRITICAL: sends cookies cross-origin (http://localhost:5173 → :5000)
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
