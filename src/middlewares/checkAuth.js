import jwt from 'jsonwebtoken';
import { env } from '../utils/helper.js';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').split(' ')[1];
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY);
    req.id = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'No access',
    });
  }
};
