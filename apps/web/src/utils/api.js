import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for auth if needed
api.interceptors.request.use((config) => {
  const userId = '60d5ec18605a9b0015f62a12'; // Valid mock MongoDB ObjectId
  config.headers['x-user-id'] = userId;
  return config;
});

export const taskApi = {
  getAll: () => api.get('/tasks'),
  create: (taskData) => api.post('/tasks', taskData),
  update: (id, taskData) => api.patch(`/tasks/${id}`, taskData),
  delete: (id) => api.delete(`/tasks/${id}`),
};

export const collaborationApi = {
  getComments: (taskId) => api.get(`/collaboration/${taskId}`),
  addComment: (taskId, commentData) => api.post(`/collaboration/${taskId}`, commentData),
};

export default api;
