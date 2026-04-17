import { body } from 'express-validator';

export const createTaskValidator = [
  body('title')
    .notEmpty().withMessage('Title must not be empty')
    .trim()
];

export const updateTaskStatusValidator = [
  body('status')
    .isIn(['todo', 'done']).withMessage('Status must be "todo" or "done"')
];
