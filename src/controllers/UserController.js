import { env } from '../utils/helper.js';
import { UserServices } from '../services/index.js';
import bcrypt from 'bcrypt';

export const getMe = async (req, res, next) => {
  try {
    res.json(await UserServices.getMe({ id: req.id }));
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req, res, next) => {
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
};

export const editPassword = async (req, res, next) => {
  try {
    res.json(
      await UserServices.editPassword({
        id: req.id,
        newPassword: req.body.password,
      })
    );
  } catch (err) {
    next(err);
  }
};
