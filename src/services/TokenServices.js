import { jwt } from 'jsonwebtoken';
import { env } from '../utils/helper';
import { TokenModel } from '../../models/TokenModel';

export const generateToken = async (userId, payload) => {
  const accessToken = jwt.sign(payload, env.ACCESS_SECRET_KEY, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(payload, env.REFRESH_SECRET_KEY, {
    expiresIn: '30d',
  });

  saveToken(userId, refreshToken);

  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await TokenModel.findOne({
    where: {
      userId: userId,
    },
  });

  if (tokenData) {
    await TokenModel.update(
      {
        refreshToken: refreshToken,
      },
      {
        where: {
          userId: userId,
        },
      }
    );
  } else {
    await TokenModel.create({
      userId: userId,
      refreshToken: refreshToken,
    });
  }
};
