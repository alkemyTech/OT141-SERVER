const { ROLE_ADMIN } = require('../constants/user.constants');

function msgAccessFobidden() {
  return {
    ok: false,
    msg: 'Access Forbidden',
  };
}

const checkOwnership = async (req, res, next) => {
  const { roleId } = req.user.user;
  const { id: idToken } = req.user.user; // id que mandaron en el token
  const idParams = Number(req.params.id); // id que mandaron como parametro
  try {
    // verify user ownership or admin role
    if (idToken === idParams || roleId === ROLE_ADMIN) {
      return next();
    }

    return res.status(403).json(msgAccessFobidden());
  } catch (error) {
    return res.status(403).json(msgAccessFobidden());
  }
};

module.exports = { checkOwnership };
