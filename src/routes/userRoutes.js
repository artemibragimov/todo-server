import express, { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  editPasswordValidations,
  loginValidations,
  registerValidations,
  updateMeValidations,
} from '../utils/validations.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { UserController } from '../controllers/index.js';
import { env } from '../utils/helper.js';
import { upload } from '../services/upload.services.js';

export const userRoutes = Router();

userRoutes.use('/me/uploads', express.static(env.UPLOAD_MULTER));

userRoutes.post(
  '/signup',
  registerValidations,
  handleValidationErrors,
  UserController.register
);
userRoutes.post(
  '/login',
  loginValidations,
  handleValidationErrors,
  UserController.login
);
userRoutes.post('/logout', UserController.logout);
userRoutes.get('/refresh', UserController.refresh);

userRoutes
  .route('/me')
  .get(authMiddleware, UserController.getMe)
  .put(
    authMiddleware,
    upload.single('image'),
    updateMeValidations,
    handleValidationErrors,
    UserController.updateMe
  );

userRoutes.post(
  '/me/editPassword',
  authMiddleware,
  editPasswordValidations,
  handleValidationErrors,
  UserController.editPassword
);
