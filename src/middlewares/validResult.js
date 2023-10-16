import { validationResult } from 'express-validator';
import { ApiError } from '../utils/apiError.js';

export default function validResult(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw ApiError.BadRequest(
      errors.errors.map((err) => ({
        path: err.path,
        msg: err.msg,
      }))
    );
  }

  next();
}
