const { check } = require('express-validator');

const validationUpdateUser = [
  check('firstName', 'The value should be type string').not().isNumeric(),
  check('lastName', 'The value should be type string').not().isNumeric(),
  check('photo', 'Photo url invalid')
    .if(check('photo').exists())
    .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
];

module.exports = { validationUpdateUser };
