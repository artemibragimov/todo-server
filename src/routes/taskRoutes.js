import { Router } from 'express';
import { TaskController } from '../controllers/index.js';
import checkAuth from '../utils/checkAuth.js';

export const taskRoutes = Router();

taskRoutes.get('/', checkAuth, TaskController.getAllTasks);
taskRoutes.post('/', checkAuth, TaskController.createTask);
taskRoutes.delete('/', checkAuth, TaskController.deleteTask);
taskRoutes.put('/', checkAuth, TaskController.updateTask);
