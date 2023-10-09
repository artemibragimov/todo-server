import { TokenServices, AuthServices } from '../services/index.js';

export const register = async (req, res, next) => {
  try {
    const tokens = await AuthServices.register({
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
    const tokens = await AuthServices.login({
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
