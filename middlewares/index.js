const checkAdminRole = require('./check.admin.role');
const checkOwnership = require('./check.ownership');
const validationAuth = require('./auth');
const validationsCategories = require('./categories');
const validateErrors = require('./validateErrors');
const validationRoles = require('./roles');
const verifyToken = require('./authJWT');
const checkAdminRoleOrUserIdFromComment = require('./check.admin.role.or.userId.from.comment');

module.exports = {
  ...checkAdminRole,
  ...checkOwnership,
  ...validationAuth,
  ...validationsCategories,
  ...validateErrors,
  ...validationRoles,
  ...verifyToken,
  ...checkAdminRoleOrUserIdFromComment,
};
