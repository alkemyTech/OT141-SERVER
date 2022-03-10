const checkAdminRole = require('./check.admin.role');
const validationAuth = require('./auth');
const validationsCategories = require('./categories');
const validateErrors = require('./validateErrors');
const validationRoles = require('./roles');
const verifyToken = require('./authJWT');

module.exports = {
  ...checkAdminRole,
  ...validationAuth,
  ...validationsCategories,
  ...validateErrors,
  ...validationRoles,
  ...verifyToken,
};
