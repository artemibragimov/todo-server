import express, { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  editEmailValidations,
  editLoginValidations,
  editPasswordValidations,
  loginValidations,
  registerValidations,
} from '../middlewares/validations.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { UserController } from '../controllers/index.js';
import multer from 'multer';

export const userRoutes = Router();

userRoutes.use(
  '/uploads',
  express.static('C:\\CODE\\todo-server\\src\\uploads')
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\\CODE\\todo-server\\src\\uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

userRoutes.post(
  '/uploads',
  authMiddleware,
  upload.single('image'),
  UserController.uploadAvatar
);

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
