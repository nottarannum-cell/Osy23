import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { loadConfig } from './config.js';
import { router as apiRouter } from './routes/index.js';

// Load environment variables
dotenv.config();

const config = loadConfig();
const app = express();

// Middlewares
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Health route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// API routes
app.use('/api', apiRouter);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
