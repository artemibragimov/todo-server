import { env } from '../utils/helper.js';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/UserModel.js';
import { TokenServices } from './index.js';
import { ApiError } from '../utils/apiError.js';

export const register = async (data) => {
  const findUser = await UserModel.findOne({
    where: {
      login: data.login,
      email: data.email,
    },
  });

  if (findUser) {
    throw ApiError.BadRequest('User with this login or email already exists');
  }

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

  const isValidPass = await bcrypt.compare(data.password, user.password);

  if (!user || !isValidPass) {
    throw ApiError.BadRequest('Invalid email or password');
  }

  const tokens = await TokenServices.generateToken({ id: user.id });
  await TokenServices.saveToken(user.id, tokens.refreshToken);

  return tokens;
};

export const me = async (data) => {
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
