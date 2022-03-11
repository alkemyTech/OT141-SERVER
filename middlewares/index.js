const checkAdminRole = require('./check.admin.role');
const checkOwnership = require('./check.ownership');
const validationAuth = require('./auth');
const validationsCategories = require('./categories');
const validationsCreateTestimony = require('./testimony.validations');
const validateErrors = require('./validateErrors');
const validationRoles = require('./roles');
const verifyToken = require('./authJWT');

module.exports = {
  ...checkAdminRole,
  ...checkOwnership,
  ...validationAuth,
  ...validationsCategories,
  ...validationsCreateTestimony,
  ...validateErrors,
  ...validationRoles,
  ...verifyToken,
};
