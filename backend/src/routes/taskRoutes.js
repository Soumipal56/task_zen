import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { createTaskValidator, updateTaskStatusValidator } from '../validators/taskValidator.js';
import { handleValidationErrors } from '../middlewares/validate.js';

// import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// NO AUTH MIDDLEWARE - SOLVING 401 FOR IN-MEMORY MODE Gall
// router.use(protect); 

router.get('/', taskController.getAllTasks);
router.post('/', createTaskValidator, handleValidationErrors, taskController.createTask);
router.put('/:id', updateTaskStatusValidator, handleValidationErrors, taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

export default router;
