const db = require('../models');
const { ROLE_ADMIN } = require('../constants/user.constants');

module.exports = {
  remove: async (req, res) => {
    const { roleId, id: user_id } = req.user.user;
    const { id: commentId } = req.params;

    try {
      const where =
        roleId === ROLE_ADMIN ? { id: commentId } : { id: commentId, user_id };

      const isDeleted = await db.Comment.destroy({ where });

      if (isDeleted) {
        return res.status(200).json({
          msg: 'Comment deleted successfully',
        });
      }

      res.status(404).json({
        msg: 'The comment does not exist',
      });
    } catch (error) {
      res.status(503).json({ msg: 'Server failure' });
    }
  },
};
