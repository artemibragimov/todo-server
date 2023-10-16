import { Router } from 'express';
import * as AuthServices from '../../../services/auth.services.js';
import { registerValidations } from '../../../utils/validations.js';
import validResult from '../../../middlewares/validResult.js';

export default Router().post(
  '/',
  registerValidations,
  validResult,
  async (req, res, next) => {
    try {
      const tokens = await AuthServices.register({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.json({ ...tokens });
    } catch (err) {
      next(err);
    }
  }
);
