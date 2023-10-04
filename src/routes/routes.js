import { Router } from 'express';
import { userRoutes } from './userRoutes.js';
import { taskRoutes } from './taskRoutes.js';

export const routes = Router();

routes.use('/auth', userRoutes);
routes.use('/', taskRoutes);
