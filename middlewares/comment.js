const { body } = require('express-validator');

const createCommentValidation = [
  body('post_id')
    .notEmpty()
    .bail()
    .isNumeric(),
  body('user_id')
    .notEmpty()
    .bail()
    .isNumeric(),
  body('body')
    .notEmpty()
    .bail()
    .isLength({ min: 5 }),
];

module.exports = { createCommentValidation };
