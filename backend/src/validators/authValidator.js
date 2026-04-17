import { body } from 'express-validator';

export const registerValidator = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .trim(),
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long')
];

export const loginValidator = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];
