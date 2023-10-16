import { Router } from 'express';
import * as UserServices from '../../services/user.services.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { updateMeValidations } from '../../utils/validations.js';
import validResult from '../../middlewares/validResult.js';
export default Router().put(
  '/',
  authMiddleware,
  updateMeValidations,
  validResult,
  async (req, res, next) => {
    try {
      res.json(
        await UserServices.updateMe({
          id: req.id,
          updateData: { login: req.body.login, email: req.body.email },
        })
      );
    } catch (err) {
      next(err);
    }
  }
);
