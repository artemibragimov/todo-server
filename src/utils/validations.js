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
    .withMessage('The email must be a valid email address')
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
      throw new Error('Password confirmation does not match password');
    } else {
      return true;
    }
  }),
];

export const loginValidations = [
  //verification of login data
  body('login').isLength({ min: 5 }).withMessage('The login field is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('The password field is required'),
];

export const updateMeValidations = [
  //verification of update user data
  body('login')
    .isLength({ min: 5 })
    .withMessage('The login must consist of at least 5 characters')
    .custom(async (login, { req }) => {
      const user = await UserModel.findOne({
        where: {
          login: login,
        },
      });

      if (user && user.id !== req.id) {
        throw Error('Login already in use');
      }
    }),
  body('email')
    .isEmail()
    .withMessage('The email must be a valid email address')
    .custom(async (email, { req }) => {
      const user = await UserModel.findOne({
        where: {
          login: email,
        },
      });

      if (user && user.id !== req.id) {
        throw Error('Email already in use');
      }
    }),
];

export const editPasswordValidations = [
  body(
    'password',
    'The password must consist of at least 6 characters'
  ).isLength({ min: 6 }),
];
