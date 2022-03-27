const { check, body } = require('express-validator');
const { isImageValid } = require('../helpers/validateImage');

const validationUpdateUser = [
  check('firstName', 'The value should be type string').not().isNumeric(),
  check('lastName', 'The value should be type string').not().isNumeric(),
  body('photo')
    .custom((_, { req }) => isImageValid(req, 'photo')),
];

module.exports = { validationUpdateUser };
