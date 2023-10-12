import { Router } from 'express';
import * as TaskServices from '../../services/task.services.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

export default Router().delete('/', authMiddleware, async (req, res, next) => {
  try {
    res.json(
      await TaskServices.deleteTask({ id: req.body.id, userId: req.id })
    );
  } catch (err) {
    next(err);
  }
});
