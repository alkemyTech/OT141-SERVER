const { check, body } = require('express-validator');
const { isImageValid } = require('../helpers/validateImage');

const validationUpdateUser = [
  check('firstName', 'The value should be type string').optional({ nullable: true }).not().isNumeric(),
  check('lastName', 'The value should be type string').optional({ nullable: true }).not().isNumeric(),
  check('email').optional({ nullable: true }).isEmail().withMessage('Email must be like:email@gmail.com'),
  check('password').optional({ nullable: true })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,25}$/,
    )
    .withMessage(
      'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long',
    ),
  body('photo')
    .custom((_, { req }) => isImageValid(req, 'photo')),
];

module.exports = { validationUpdateUser };
