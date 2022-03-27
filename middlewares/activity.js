const { body } = require('express-validator');
const { isImageValid } = require('../helpers/validateImage');
const db = require('../models');

const validationsActivities = [
  body('name')
    .notEmpty() // Valid that it is not empty
    .withMessage('Input required')
    .bail()
    .not()
    .isNumeric() // Valid that it is a string (I place the .not())
    .withMessage('The value cannot be numeric.')
    .isLength({ min: 5 }) // Valido su longitud
    .withMessage('String must be more than 4 characters')
    .bail()
    .custom(async (value) => {
      // Function that detects if an activity with the same name exists
      const activity = await db.Activity.findOne({ where: { name: value } });
      return (
        activity
        && Promise.reject(Error('The activity already exists in the database'))
      );
    }),

  body('content')
    .notEmpty() // Valid that it is not empty
    .withMessage('Input required')
    .bail()
    .not()
    .isNumeric() // Valid that it is a string (I place the .not())
    .withMessage('The value cannot be numeric.'),

  body('image')
    .custom((_, { req }) => isImageValid(req, 'image')),
];

module.exports = { validationsActivities };
