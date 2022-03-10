const { check } = require('express-validator');
const { isExistCategory } = require('../helpers/validateInDB');

const validationCreateCategory = [
  check('name', 'The value is required').not().isEmpty(),
  check('name', 'The value should be type string').isString(),
  check('description', 'The value not is a string').if(check('description').exists()).isString(),
  check('image', 'The value not is a string').if(check('image').exists()).isString(),
  check('name').custom(isExistCategory),
];

module.exports = {
  validationCreateCategory,
};
