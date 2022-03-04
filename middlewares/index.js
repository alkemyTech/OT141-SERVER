const validateErrors = require('./validateErrors');
const validationAuth = require('./auth');
const validationsCategories = require('./categories');
const verifyToken = require('./authJWT');

module.exports = {
  ...validateErrors,
  ...validationAuth,
  ...validationsCategories,
  verifyToken,
};
