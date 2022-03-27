const { validationResult } = require('express-validator');

const validateErrors = (req, res, next) => {
  const errors = validationResult(req);
  const errorsObjects = errors.mapped();
  if (!errors.isEmpty()) {
    for (key in errorsObjects) { // eslint-disable-line
      delete errorsObjects[key].param; // eslint-disable-line
      delete errorsObjects[key].location; // eslint-disable-line
      delete errorsObjects[key].value; // eslint-disable-line
    }

    return res.status(422).json({ errors: errorsObjects });
  }
  return next();
};

module.exports = {
  validateErrors,
};
