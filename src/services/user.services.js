import { env } from '../utils/helper.js';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/UserModel.js';
import { TokenServices } from './index.js';
import { ApiError } from '../utils/apiError.js';

export const register = async (data) => {
  const salt = await bcrypt.genSalt(parseInt(env.SALT));
  const passwordHash = await bcrypt.hash(data.password, salt);

  const user = await UserModel.create({
    login: data.login,
    email: data.email,
    password: passwordHash,
  });

  const tokens = await TokenServices.generateToken({ id: user.id });
  await TokenServices.saveToken(user.id, tokens.refreshToken);

  return tokens;
};

export const login = async (data) => {
  const user = await UserModel.findOne({
    where: {
      login: data.login,
    },
  });
  if (!user) {
    throw ApiError.BadRequest('Invalid email or password');
  }
  const isValidPass = await bcrypt.compare(data.password, user.password);

  if (!isValidPass) {
    throw ApiError.BadRequest('Invalid email or password');
  }

  const tokens = await TokenServices.generateToken({ id: user.id });
  await TokenServices.saveToken(user.id, tokens.refreshToken);

  return tokens;
};

export const getMe = async (data) => {
  const user = await UserModel.findOne({
    where: {
      id: data.id,
    },
  });

  return {
    login: user.login,
    email: user.email,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt,
  };
};

export const editPassword = async (data) => {
  const salt = await bcrypt.genSalt(parseInt(env.SALT));
  const passwordHash = await bcrypt.hash(data.newPassword, salt);
  await UserModel.update(
    {
      password: passwordHash,
    },
    {
      where: {
        id: data.id,
      },
    }
  );

  return 'success';
};

export const updateMe = async (data) => {
  await UserModel.update(data.updateData, {
    where: {
      id: data.id,
    },
  });

  return {
    message: 'user data has been updated',
  };
};
