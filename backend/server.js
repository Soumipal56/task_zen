import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { PORT, NODE_ENV } from './src/config/index.js';
import taskRoutes from './src/routes/taskRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import connectDB from './src/config/db.js';
import { errorHandler } from './src/middlewares/error.js';

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
