import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Turn backend validation errors into a readable message in error.response.data.detail.
api.interceptors.response.use(
  response => response,
  error => {
    const data = error.response?.data;
    if (data && typeof data === 'object') {
      if (Array.isArray(data.detail)) {
        // FastAPI validation errors: [{ loc, msg }, ...]
        data.detail = data.detail
          .map(d => (d.loc ? `${d.loc[d.loc.length - 1]}: ` : '') + (d.msg || JSON.stringify(d)))
          .join(' ');
      } else if (!data.detail) {
        // Django REST Framework: { field: ["msg", ...] }; Express: { message } / { error }
        const messages = Object.entries(data).map(([field, value]) => {
          const text = Array.isArray(value) ? value.join(' ') : String(value);
          return ['non_field_errors', 'message', 'error'].includes(field)
            ? text
            : `${field.charAt(0).toUpperCase() + field.slice(1)}: ${text}`;
        });
        if (messages.length) data.detail = messages.join(' ');
      }
    }
    return Promise.reject(error);
  }
);


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;