import { Router } from 'express';
import { upload } from '../services/upload.services.js';
import {
  editPasswordValidations,
  updateMeValidations,
} from '../utils/validations.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import { UserController } from '../controllers/index.js';

export const userRoutes = Router();

userRoutes
  .route('/')
  .get(UserController.getMe)
  .put(updateMeValidations, handleValidationErrors, UserController.updateMe);

userRoutes
  .route('/uploads')
  .put(upload.single('image'), UserController.updateMe);

userRoutes
  .route('/editPassword')
  .post(
    editPasswordValidations,
    handleValidationErrors,
    UserController.editPassword
  );
