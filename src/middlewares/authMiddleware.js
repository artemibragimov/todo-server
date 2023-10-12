import { ApiError } from '../utils/apiError.js';
import * as TokenServices from '../services/token.services.js';

export default function authMiddleware(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const validate = TokenServices.validateAccessToken(accessToken);
    if (!validate) throw ApiError.UnauthorizedAccessError();

    req.id = validate.id;
    next();
  } catch (err) {
    next(err);
  }
}
