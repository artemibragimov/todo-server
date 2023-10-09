import express, { Router } from 'express';
import { authRoutes } from './authRoutes.js';
import { taskRoutes } from './taskRoutes.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { userRoutes } from './userRoutes.js';

export const routes = Router();
routes.use('/tasks', authMiddleware, taskRoutes);
routes.use('/auth', authRoutes);
routes.use('/me', authMiddleware, userRoutes);
