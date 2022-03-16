const { ROLE_ADMIN } = require('../constants/user.constants');
const db = require('../models');

module.exports = {
  update: async (req, res) => {
    const { roleId, id: user_id } = req.user.user;
    const { id: commentId } = req.params;
    const { body } = req.body;

    try {
      const where =
        roleId === ROLE_ADMIN ? { id: commentId } : { id: commentId, user_id };

      const isUpdate = await db.Comment.update({ body }, { where });
      if (isUpdate[0]) {
        return res.status(200).json({
          msg: 'Comment updated successfully',
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
