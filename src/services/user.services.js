import { UserModel } from '../models/UserModel.js';

export const getMe = async ({ id }) => {
  const user = await UserModel.findOne({
    where: {
      id: id,
    },
  });

  return {
    login: user.login,
    email: user.email,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt,
  };
};

export const updateMe = async ({ id, updateData }) => {
  await UserModel.update(updateData, {
    where: {
      id: id,
    },
  });

  return {
    message: 'user data has been updated',
  };
};
