const { check, body } = require('express-validator');
const { isImageValid } = require('../helpers/validateImage');
const { isExistCategory } = require('../helpers/validateInDB');

const validationCreateCategory = [
  check('name', 'The value is required').not().isEmpty(),
  check('name', 'The value should be type string').not().isNumeric(),
  check('name').custom(isExistCategory),
  check('description', 'The value not is a string').if(check('description').exists()).not().isNumeric(),
  body('image')
    .custom((_, { req }) => isImageValid(req, 'image'))];

const validationUpdateCategory = [
  check('name', 'The value is required').not().isEmpty(),
  check('name', 'The value should be type string').not().isNumeric(),
  check('description', 'The value not is a string')
    .if(check('description').exists())
    .not()
    .isNumeric(),
  body('image')
    .custom((_, { req }) => isImageValid(req, 'image')),
];

module.exports = {
  validationCreateCategory,
  validationUpdateCategory,
};
