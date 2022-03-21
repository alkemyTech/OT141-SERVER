const checkAdminRole = require('./check.admin.role');
const checkOwnership = require('./check.ownership');
const validationAuth = require('./auth');
const validationsCategories = require('./categories');
const validationsCreateTestimony = require('./testimony.validations');
const validateErrors = require('./validateErrors');
const validationRoles = require('./roles');
const verifyToken = require('./authJWT');
const membersvalidations = require('./members');
const validationUpdateUser = require('./user.validations');

module.exports = {
  ...checkAdminRole,
  ...checkOwnership,
  ...validationAuth,
  ...validationsCategories,
  ...validationsCreateTestimony,
  ...validateErrors,
  ...validationRoles,
  ...verifyToken,
  ...membersvalidations,
  ...validationUpdateUser,
};
