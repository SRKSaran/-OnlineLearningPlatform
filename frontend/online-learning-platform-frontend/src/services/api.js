import axios from 'axios';

const apiUrl = "http://localhost:8000";

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
