import express from 'express';
import { router as healthRouter } from './health.js';
import { router as exampleRouter } from './example.js';
import { router as authRouter } from './auth.js';

export const router = express.Router();

router.use('/health', healthRouter);
router.use('/example', exampleRouter);
router.use('/auth', authRouter);
