const { ROLE_ADMIN } = require('../constants/user.constants');

const checkAdminRole = async (req, res, next) => {
  const { roleId } = req.user.user;
  try {
    // In the database the number 1 represents the administrator role
    if (roleId !== ROLE_ADMIN) {
      return res.status(401).json({
        meta: {
          status: 401,
          ok: false,
        },
        errors: { msg: 'You do not have permissions for this resource' },
      });
    }
    return next();
  } catch (error) {
    return res.status(503).json({
      meta: {
        status: 503,
        ok: false,
      },
      errors: { msg: 'Server failure' },
    });
  }
};

module.exports = { checkAdminRole };
