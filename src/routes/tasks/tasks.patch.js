import { Router } from 'express';
import * as TaskServices from '../../services/task.services.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
export default Router().patch('/', authMiddleware, async (req, res, next) => {
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
});
