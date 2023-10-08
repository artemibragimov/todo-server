import { body } from 'express-validator';
import { UserModel } from '../models/UserModel.js';

export const registerValidations = [
  //verification of registration data
  body('login')
    .isLength({ min: 5 })
    .withMessage('The login must consist of at least 5 characters')
    .custom(async (login) => {
      const user = await UserModel.findOne({
        where: {
          login: login,
        },
      });

      if (user) {
        throw Error('Login already in use');
      }
    }),
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (email) => {
      const user = await UserModel.findOne({
        where: {
          login: email,
        },
      });

      if (user) {
        throw Error('Email already in use');
      }
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('The password must consist of at least 6 characters'),

  body('passwordConfirmation').custom((passwordConfirmation, { req }) => {
    if (passwordConfirmation !== req.body.password) {
      throw new Error("Passwords don't match");
    }
  }),
];

export const loginValidations = [
  //verification of login data
  body('login')
    .isLength({ min: 5 })
    .withMessage('The login must consist of at least 5 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('The password must consist of at least 6 characters'),
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
