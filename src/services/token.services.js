import jwt from 'jsonwebtoken';
import { env } from '../utils/helper.js';
import { TokenModel } from '../models/TokenModel.js';
import { ApiError } from '../utils/apiError.js';

export const generateToken = async (payload) => {
  const accessToken = jwt.sign(payload, env.ACCESS_SECRET_KEY, {
    expiresIn: '2h',
  });

  const refreshToken = jwt.sign(payload, env.REFRESH_SECRET_KEY, {
    expiresIn: '30d',
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const saveToken = async (userId, refreshToken) => {
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

export const removeToken = async (refreshToken) => {
  await TokenModel.destroy({
    where: {
      refreshToken: refreshToken,
    },
  });
};

export const findToken = async (refreshToken) => {
  return await TokenModel.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });
};

export const validateRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, env.REFRESH_SECRET_KEY);
  } catch (err) {
    throw ApiError.UnauthorizedRefreshError();
  }
};

export const validateAccessToken = (accessToken) => {
  try {
    return jwt.verify(accessToken, env.ACCESS_SECRET_KEY);
  } catch (err) {
    return null;
  }
};

export const refresh = async (data) => {
  const token = validateRefreshToken(data.refreshToken);
  const tokenFromDb = findToken(data.refreshToken);
  if (!token || !tokenFromDb) {
    throw ApiError.UnauthorizedAccessError();
  }

  const tokens = await generateToken({ id: token.id });
  await saveToken(token.id, tokens.refreshToken);

  return tokens;
};
