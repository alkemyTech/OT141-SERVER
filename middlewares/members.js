const { check } = require('express-validator');

const memberValidations = [
  check('name', 'The value is required').not().isEmpty().bail(),
  check('name', 'The value should be type string').not().isNumeric(),
  check('image', 'Image url invalid')
    .if(check('image').exists())
    .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
];

module.exports = {
  memberValidations,
};
