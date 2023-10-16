import { Router } from 'express';
import * as AuthServices from '../../../services/auth.services.js';
import { loginValidations } from '../../../utils/validations.js';
import validResult from '../../../middlewares/validResult.js';

export default Router().post(
  '/',
  loginValidations,
  validResult,
  async (req, res, next) => {
    try {
      const tokens = await AuthServices.login({
        login: req.body.login,
        password: req.body.password,
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ ...tokens });
    } catch (err) {
      next(err);
    }
  }
);
