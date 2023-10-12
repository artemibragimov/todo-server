import { Router } from 'express';
import * as TaskServices from '../../services/task.services.js';
import { defineFilter } from '../../utils/defineFilter.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

export default Router().get('/', authMiddleware, async (req, res, next) => {
  try {
    res.json(
      await TaskServices.getTasks({
        userId: req.id,
        currentPage: req.query.currentPage,
        filter: defineFilter(req.query.filter),
      })
    );
  } catch (err) {
    next(err);
  }
});
