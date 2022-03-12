const db = require('../models');

module.exports = {
  remove: async (req, res) => {
    // const variables
    const { id: commentId } = req.params;
    try {
      await db.Comment.destroy({
        where: {
          id: commentId,
        },
      });
      res.status(200).json({
        msg: 'Comment deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        msg: 'An error occurred',
      });
    }
  },
};
