import { Router } from 'express';
import * as TokenServices from '../../../services/token.services.js';

export default Router().post('/', async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await TokenServices.removeToken(refreshToken);

    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'logout' });
  } catch (err) {
    next(err);
  }
});
