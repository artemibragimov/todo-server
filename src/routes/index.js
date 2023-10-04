import { Router } from 'express';
import { userRoutes } from './userRoutes.js';
import { taskRoutes } from './taskRoutes.js';
import checkAuth from '../middlewares/checkAuth.js';

export const routes = Router();

routes.use('/auth', userRoutes);
routes.use('/', checkAuth, taskRoutes);
