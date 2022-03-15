const { check } = require('express-validator');

const newMemberValidations = [
  check('name', 'The value is required').not().isEmpty(),
  check('name', 'The value should be type string').isString(),
  check('image', 'The value is required').not().isEmpty(),
  check('image', 'The value not is a string').isString(),
];

module.exports = {
  newMemberValidations,
};
