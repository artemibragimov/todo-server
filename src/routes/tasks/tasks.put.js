import { Router } from 'express';
import * as TaskServices from '../../services/task.services.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { taskValidations } from '../../utils/validations.js';
import validResult from '../../middlewares/validResult.js';
export default Router().put(
  '/',
  authMiddleware,
  taskValidations,
  validResult,
  async (req, res, next) => {
    try {
      res.json(
        await TaskServices.updateTask({
          userId: req.id,
          id: req.body.id,
          name: req.body.name.trim(),
          isDone: req.body.isDone,
        })
      );
    } catch (err) {
      next(err);
    }
  }
);
