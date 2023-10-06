import { Router } from 'express';
import { userRoutes } from './userRoutes.js';
import { taskRoutes } from './taskRoutes.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export const routes = Router();

routes.use('/auth', userRoutes);
routes.use('/', authMiddleware, taskRoutes);
