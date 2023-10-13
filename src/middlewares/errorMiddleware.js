import { ApiError } from '../utils/apiError.js';

export default function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    console.log('💥💥💥', err);
    return res.status(err.status).json(err.data);
  }

  return res.status(500).json({ message: 'Server error' });
}
