import { Router } from 'express';
import * as UserServices from '../../services/user.services.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { updateMeValidations } from '../../utils/validations.js';
import handleValidationErrors from '../../middlewares/formValidation.js';
export default Router().put(
  '/',
  authMiddleware,
  updateMeValidations,
  handleValidationErrors,
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
