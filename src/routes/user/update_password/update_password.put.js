import { Router } from 'express';
import bcrypt from 'bcrypt';
import { env } from '../../../utils/helper.js';
import * as UserServices from '../../../services/user.services.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';
import handleValidationErrors from '../../../middlewares/formValidation.js';
import { updatePasswordValidations } from '../../../utils/validations.js';
export default Router().put(
  '/',
  authMiddleware,
  updatePasswordValidations,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt(parseInt(env.SALT));
      const password = await bcrypt.hash(req.body.password, salt);

      res.json(
        await UserServices.updateMe({
          id: req.id,
          updateData: { password: password },
        })
      );
    } catch (err) {
      next(err);
    }
  }
);
