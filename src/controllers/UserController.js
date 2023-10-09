import { env } from '../utils/helper.js';
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
    console.log(req.body.password);
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

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await TokenServices.removeToken(refreshToken);

    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'logout' });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const tokens = await TokenServices.refresh({
      refreshToken: refreshToken,
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(tokens.accessToken);
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.json(await UserServices.getMe({ id: req.id }));
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const data = { updateData: {} };
    data.id = req.id;
    if (req.body.login) {
      data.updateData.login = req.body.login;
    }
    if (req.body.email) {
      data.updateData.email = req.body.email;
    }
    if (req.file) {
      data.updateData.imageUrl =
        env.DOMAIN +
        ':' +
        env.PORT3001 +
        '/auth/me/uploads/' +
        req.file.originalname;
    }

    res.json(await UserServices.updateMe(data));
  } catch (err) {
    next(err);
  }
};

export const editPassword = async (req, res, next) => {
  try {
    res.json(
      await UserServices.editPassword({
        id: req.id,
        newPassword: req.body.text,
      })
    );
  } catch (err) {
    next(err);
  }
};
