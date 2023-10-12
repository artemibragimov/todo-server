import { Router } from 'express';
import * as TokenServices from '../../../services/token.services.js';

export default Router().get('/', async (req, res, next) => {
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
});
