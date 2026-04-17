import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT, NODE_ENV } from './src/config/index.js';
import taskRoutes from './src/routes/taskRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import connectDB from './src/config/db.js';
import { errorHandler } from './src/middlewares/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to Database
connectDB();

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL
].filter(Boolean);

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Serve frontend build (always, not just in production)
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));

// API Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Catch-all: serve index.html for SPA client-side routing (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
