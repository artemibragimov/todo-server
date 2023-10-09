import { Router } from 'express';
import { loginValidations, registerValidations } from '../utils/validations.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { AuthController } from '../controllers/index.js';

export const authRoutes = Router();

authRoutes
  .route('/signup')
  .post(registerValidations, handleValidationErrors, AuthController.register);

authRoutes
  .route('/login')
  .post(loginValidations, handleValidationErrors, AuthController.login);

authRoutes.route('/logout').post(AuthController.logout);

authRoutes.route('/refresh').get(AuthController.refresh);
