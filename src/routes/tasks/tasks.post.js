import { Router } from 'express';
import * as TaskServices from '../../services/task.services.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
export default Router().post('/', authMiddleware, async (req, res, next) => {
  try {
    res.status(201).json(
      await TaskServices.createTask({
        userId: req.id,
        name: req.body.name,
      })
    );
  } catch (err) {
    next(err);
  }
});
