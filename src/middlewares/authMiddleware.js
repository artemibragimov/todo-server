import { TokenServices } from '../services/index.js';
import { ApiError } from '../utils/apiError.js';

const authMiddleware = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];

    const validate = TokenServices.validateAccessToken(accessToken);
    if (!validate) throw ApiError.UnauthorizedAccessError();

    req.id = validate.id;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
