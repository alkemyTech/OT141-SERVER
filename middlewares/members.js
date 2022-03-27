const { check, body } = require('express-validator');
const { isImageValid } = require('../helpers/validateImage');

const memberValidations = [
  check('name', 'The value is required').not().isEmpty().bail(),
  check('name', 'The value should be type string').not().isNumeric(),
  body('image')
    .custom((_, { req }) => isImageValid(req, 'image')),
];

module.exports = {
  memberValidations,
};
