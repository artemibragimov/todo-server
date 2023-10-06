import { TokenServices } from '../services/index.js';

const authMiddleware = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const validate = TokenServices.validateAccessToken(accessToken);
    req.id = validate.id;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
