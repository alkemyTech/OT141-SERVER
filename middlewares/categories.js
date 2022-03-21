const { check } = require('express-validator');
const { isExistCategory } = require('../helpers/validateInDB');

const validationCreateCategory = [
  check('name', 'The value is required').not().isEmpty(),
  check('name', 'The value should be type string').not().isNumeric(),
  check('description', 'The value not is a string').if(check('description').exists()).not().isNumeric(),
  check('image', 'Image url invalid').if(check('image').exists()).matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
  check('name').custom(isExistCategory),
];

const validationUpdateCategory = [
  check('name', 'The value is required').not().isEmpty(),
  check('name', 'The value should be type string').not().isNumeric(),
  check('description', 'The value not is a string').if(check('description').exists()).not().isNumeric(),
  check('image', 'Image url invalid').if(check('image').exists()).matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
];

module.exports = {
  validationCreateCategory,
  validationUpdateCategory,
};
