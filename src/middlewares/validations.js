import { body } from 'express-validator';

export const registerValidations = [
  //валидация данных для регистрации
  body('login', 'The login must consist of at least 5 characters').isLength({
    min: 5,
  }),
  body('email', 'Invalid email address').isEmail(),
  body(
    'password',
    'The password must consist of at least 6 characters'
  ).isLength({ min: 6 }),
];

export const loginValidations = [
  //валидация данных для авторизации
  body('login', 'The login must consist of at least 5 characters').isLength({
    min: 5,
  }),
  body(
    'password',
    'The password must consist of at least 6 characters'
  ).isLength({ min: 6 }),
];

export const editLoginValidations = [
  body('login', 'The login must consist of at least 5 characters').isLength({
    min: 5,
  }),
];

export const editEmailValidations = [
  body('email', 'Invalid email address').isEmail(),
];

export const editPasswordValidations = [
  body(
    'password',
    'The password must consist of at least 6 characters'
  ).isLength({ min: 6 }),
];
