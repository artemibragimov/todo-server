import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { env } from '../utils/helper.js';

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
  console.log(data);
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
