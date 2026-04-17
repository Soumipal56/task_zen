import api from './api';

const API_URL = '/tasks';

export const taskService = {
  fetchTasks: async () => {
    const response = await api.get(API_URL);
    return response.data;
  },
  createTask: async (title) => {
    const response = await api.post(API_URL, { title });
    return response.data;
  },
  updateTaskStatus: async (id, status) => {
    const response = await api.put(`${API_URL}/${id}`, { status });
    return response.data;
  },
  deleteTask: async (id) => {
    await api.delete(`${API_URL}/${id}`);
    return id;
  }
};
