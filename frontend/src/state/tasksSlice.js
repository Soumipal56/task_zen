import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from '../services/taskService';

// Thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await taskService.fetchTasks();
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
  return await taskService.createTask(taskData.title);
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, status }) => {
  return await taskService.updateTaskStatus(id, status);
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await taskService.deleteTask(id);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [], // Renamed from items to tasks for component compatibility
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  }
});

export default tasksSlice.reducer;
