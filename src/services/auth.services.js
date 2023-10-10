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
  if (!user) throw ApiError.BadRequest('Invalid login or password');

  const isValidPass = await bcrypt.compare(data.password, user.password);

  if (!isValidPass) throw ApiError.BadRequest('Invalid login or password');

  const tokens = await TokenServices.generateToken({ id: user.id });
  await TokenServices.saveToken(user.id, tokens.refreshToken);

  return tokens;
};
