import Task from '../models/Task.js';

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    const newTask = await Task.create({ 
      title,
      user: req.user.id 
    });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findOne({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
