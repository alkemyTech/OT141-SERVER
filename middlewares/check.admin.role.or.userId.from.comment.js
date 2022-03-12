const { ROLE_ADMIN } = require('../constants/user.constants');
const db = require('../models');

const checkAdminRoleOrUserIdFromComment = async (req, res, next) => {
  const { roleId, id } = req.user.user;
  const { id: commentId } = req.params;
  const commentFound = await db.Comment.findByPk(commentId);

  try {
    if (!commentFound) {
      return res.status(404).json({
        msg: 'The comment does not exist',
      });
    }

    if (roleId === ROLE_ADMIN || id === commentFound.user_id) {
      return next();
    }

    res
      .status(401)
      .json({ msg: 'You do not have permissions for this resource' });
  } catch (error) {
    res.status(503).json({ msg: 'Server failure' });
  }
};

module.exports = { checkAdminRoleOrUserIdFromComment };
