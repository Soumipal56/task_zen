import api from './api';

const BASE_URL = 'http://localhost:5000/tasks/';

export const taskService = {
  fetchTasks: async () => {
    const response = await api.get(BASE_URL);
    return response.data;
  },
  createTask: async (title) => {
    const response = await api.post(BASE_URL, { title });
    return response.data;
  },
  updateTaskStatus: async (id, status) => {
    const response = await api.put(`${BASE_URL}${id}`, { status });
    return response.data;
  },
  deleteTask: async (id) => {
    await api.delete(`${BASE_URL}${id}`);
    return id;
  }
};
