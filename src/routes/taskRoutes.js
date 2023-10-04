import { Router } from 'express';
import { TaskController } from '../controllers/index.js';

export const taskRoutes = Router();

taskRoutes
  .route('/')
  .get(TaskController.getAllTasks)
  .post(TaskController.createTask)
  .put(TaskController.updateTask)
  .delete(TaskController.deleteTask);
