import express from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';
import { handleValidationErrors } from '../middlewares/validate.js';

const router = express.Router();

router.post('/register', registerValidator, handleValidationErrors, register);
router.post('/login', loginValidator, handleValidationErrors, login);

export default router;
