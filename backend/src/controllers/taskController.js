// In-memory data store for tasks
let tasks = [
  { id: 1, title: 'Learn React basics', status: 'todo' },
  { id: 2, title: 'Build a Todo App', status: 'done' },
  { id: 3, title: 'Understand useState and useEffect', status: 'todo' },
  { id: 4, title: 'Set up Node.js server', status: 'done' },
  { id: 5, title: 'Connect to MongoDB', status: 'todo' },
  { id: 6, title: 'Create REST APIs', status: 'done' },
  { id: 7, title: 'Implement authentication', status: 'todo' },
  { id: 8, title: 'Learn Redux Toolkit', status: 'todo' },
  { id: 9, title: 'Deploy app to cloud', status: 'todo' },
  { id: 10, title: 'Write project documentation', status: 'done' }
];

export const getAllTasks = async (req, res, next) => {
  try {
    // Return the in-memory tasks
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    
    // Generate new ID (max id + 1)
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    
    const newTask = {
      id: newId,
      title,
      status: 'todo'
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex].status = status;
    res.json(tasks[taskIndex]);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks = tasks.filter(t => t.id !== parseInt(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
