import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, toggleTaskStatus, deleteTask } from '../state/tasksSlice';

export const useTasks = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (title) => {
    if (title.trim()) {
      dispatch(addTask(title));
    }
  };

  const handleToggleTask = (id, status) => {
    dispatch(toggleTaskStatus({ id, status }));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const todoTasks = items.filter((task) => task.status === 'todo');
  const doneTasks = items.filter((task) => task.status === 'done');

  return {
    todoTasks,
    doneTasks,
    loading,
    error,
    handleAddTask,
    handleToggleTask,
    handleDeleteTask
  };
};
