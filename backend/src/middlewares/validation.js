export const validateTask = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title must not be empty' });
  }
  next();
};

export const validateStatus = (req, res, next) => {
  const { status } = req.body;
  const allowedStatuses = ['todo', 'done'];
  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status must be "todo" or "done"' });
  }
  next();
};
