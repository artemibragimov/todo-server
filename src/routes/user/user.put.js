import { Router } from 'express';
import bcrypt from 'bcrypt';
import { env } from '../../utils/helper.js';
import * as UserServices from '../../services/user.services.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { updateMeValidations } from '../../utils/validations.js';
import handleValidationErrors from '../../middlewares/handleValidationErrors.js';
export default Router().put(
  '/',
  authMiddleware,
  updateMeValidations,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const data = { updateData: {} };
      data.id = req.id;
      if (req.body.login) {
        data.updateData.login = req.body.login;
      }
      if (req.body.email) {
        data.updateData.email = req.body.email;
      }
      if (req.body.password) {
        const salt = await bcrypt.genSalt(parseInt(env.SALT));
        data.updateData.password = await bcrypt.hash(req.body.password, salt);
      }
      if (req.file) {
        data.updateData.imageUrl =
          env.DOMAIN + ':' + env.PORT3001 + '/uploads/' + req.file.originalname;
      }

      res.json(await UserServices.updateMe(data));
    } catch (err) {
      next(err);
    }
  }
);
