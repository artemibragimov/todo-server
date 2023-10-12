import { UserModel } from '../models/UserModel.js';

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
