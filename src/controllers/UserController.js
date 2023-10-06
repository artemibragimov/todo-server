import { UserModel } from '../models/UserModel.js';
import { env } from '../utils/helper.js';
import bcrypt from 'bcrypt';
import { TokenServices, UserServices } from '../services/index.js';

export const register = async (req, res, next) => {
  try {
    const tokens = await UserServices.register({
      login: req.body.login,
      email: req.body.email,
      password: req.body.password,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({ ...tokens });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const tokens = await UserServices.login({
      login: req.body.login,
      password: req.body.password,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({ ...tokens });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    await TokenServices.removeToken(refreshToken);

    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'logout' });
  } catch (err) {
    res.status(500).json({
      message: 'no logout',
    });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const token = TokenServices.validateRefreshToken(refreshToken);
    const tokenFromDb = TokenServices.findToken(refreshToken);
    if (!token || !tokenFromDb) {
      res.status(404).json({ message: 'no verify token' });
    }

    const tokens = await TokenServices.generateToken({ id: req.id });
    await TokenServices.saveToken(req.id, tokens.refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json({ ...tokens });
  } catch (err) {
    res.status(500).json({
      message: 'no refresh',
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id: req.id,
      },
    });

    const { login, email, createdAt, imageUrl, ...userData } = user;

    res.json({
      login: login,
      email: email,
      imageUrl: imageUrl,
      createdAt: createdAt,
    });
  } catch (err) {
    return res.status(404).json({
      message: 'user not found',
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    await UserModel.update(
      {
        imageUrl:
          env.DOMAIN +
          ':' +
          env.PORT3001 +
          '/auth/uploads/' +
          req.file.originalname,
      },
      {
        where: {
          id: req.id,
        },
      }
    );

    res.json('success');
  } catch (err) {
    return res.status(404).json({
      message: 'user not found',
    });
  }
};

export const editLogin = async (req, res) => {
  try {
    await UserModel.update(
      {
        login: req.body.login,
      },
      {
        where: {
          id: req.id,
        },
      }
    );

    res.json('success');
  } catch (err) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
};

export const editEmail = async (req, res) => {
  try {
    await UserModel.update(
      {
        email: req.body.email,
      },
      {
        where: {
          id: req.id,
        },
      }
    );

    res.json('success');
  } catch (err) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
};

export const editPassword = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(env.SALT));
    const passwordHash = await bcrypt.hash(req.body.text, salt);
    await UserModel.update(
      {
        password: passwordHash,
      },
      {
        where: {
          id: req.id,
        },
      }
    );

    res.json('success');
  } catch (err) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
};
