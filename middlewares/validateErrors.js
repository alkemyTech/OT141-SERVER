const { validationResult } = require('express-validator');

const validateErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors });
  }
  return next();
};

module.exports = {
  validateErrors,
};
