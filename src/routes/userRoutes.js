import express, { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  editEmailValidations,
  editLoginValidations,
  editPasswordValidations,
  loginValidations,
  registerValidations,
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
userRoutes.get('/me', authMiddleware, UserController.me);

userRoutes.post(
  '/me/uploads',
  authMiddleware,
  upload.single('image'),
  UserController.uploadAvatar
);

userRoutes.post(
  '/me/editLogin',
  authMiddleware,
  editLoginValidations,
  handleValidationErrors,
  UserController.editLogin
);
userRoutes.post(
  '/me/editEmail',
  authMiddleware,
  editEmailValidations,
  handleValidationErrors,
  UserController.editEmail
);
userRoutes.post(
  '/me/editPassword',
  authMiddleware,
  editPasswordValidations,
  handleValidationErrors,
  UserController.editPassword
);
