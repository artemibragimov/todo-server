import { env } from '../utils/helper.js';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/UserModel.js';
import { ApiError } from '../utils/apiError.js';
import * as TokenServices from './token.services.js';

export const register = async ({ login, email, password }) => {
  const salt = await bcrypt.genSalt(parseInt(env.SALT));
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    login: login,
    email: email,
    password: passwordHash,
  });

  const tokens = await TokenServices.generateToken({ id: user.id });
  await TokenServices.saveToken({
    userId: user.id,
    refreshToken: tokens.refreshToken,
  });

  return tokens;
};

export const login = async ({ login, password }) => {
  const user = await UserModel.findOne({
    where: {
      login: login,
    },
  });
  if (!user) throw ApiError.BadRequest('Invalid login or password');

  const isValidPass = await bcrypt.compare(password, user.password);

  if (!isValidPass) throw ApiError.BadRequest('Invalid login or password');

  const tokens = await TokenServices.generateToken({ id: user.id });
  await TokenServices.saveToken({
    userId: user.id,
    refreshToken: tokens.refreshToken,
  });

  return tokens;
};
