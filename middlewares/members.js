const { check } = require('express-validator');

const newMemberValidations = [
  check('name', 'The value is required').not().isEmpty(),
  check('name', 'The value should be type string').isString(),
];

module.exports = {
  newMemberValidations,
};
