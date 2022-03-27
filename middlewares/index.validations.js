const { validationResult } = require('express-validator');
const { validationsActivities } = require('./activity');
const { checkAdminRole } = require('./check.admin.role');
const { checkTokenAuthorization } = require('./check.tokenAuthorization');

const indexValidation = (req, res, next) => {
// Constant variables
  const errors = validationResult(req);
  const errorsObjects = errors.mapped();

  if (!errors.isEmpty()) {
    for (key in errorsObjects) { // eslint-disable-line
      delete errorsObjects[key].param; // eslint-disable-line
      delete errorsObjects[key].location; // eslint-disable-line
    }

    return res.status(422).json({
      meta: {
        status: 422,
        ok: false,
      },
      data: null,
      errors: errorsObjects,
    });
  }
  return next();
};

module.exports = {
  validationsActivities,
  indexValidation,
  checkAdminRole,
  checkTokenAuthorization,
};
