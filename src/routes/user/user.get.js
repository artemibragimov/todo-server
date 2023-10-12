import { Router } from 'express';
import * as UserServices from '../../services/user.services.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
export default Router().get('/', authMiddleware, async (req, res, next) => {
  try {
    res.json(await UserServices.getMe({ id: req.id }));
  } catch (err) {
    next(err);
  }
});
