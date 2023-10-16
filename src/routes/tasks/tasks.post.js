import { Router } from 'express';
import * as TaskServices from '../../services/task.services.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { taskValidations } from '../../utils/validations.js';
import validResult from '../../middlewares/validResult.js';
export default Router().post(
  '/',
  authMiddleware,
  taskValidations,
  validResult,
  async (req, res, next) => {
    try {
      res.status(201).json(
        await TaskServices.createTask({
          userId: req.id,
          name: req.body.name.trim(),
        })
      );
    } catch (err) {
      next(err);
    }
  }
);
