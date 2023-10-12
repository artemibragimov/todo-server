import { Router } from 'express';
import { env } from '../../../utils/helper.js';
import * as UserServices from '../../../services/user.services.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';
import upload from '../../../services/upload.services.js';

export default Router().post(
  '/',
  authMiddleware,
  upload.single('image'),
  async (req, res, next) => {
    try {
      res.json(
        await UserServices.updateMe({
          id: req.id,
          updateData: {
            imageUrl: env.URL + '/uploads/' + req.file.originalname,
          },
        })
      );
    } catch (err) {
      next(err);
    }
  }
);
