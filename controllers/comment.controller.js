const db = require('../models');

module.exports = {
  update: async (req, res) => {
    // const variables
    const { id: commentId } = req.params;
    const { body } = req.body;
    try {
      await db.Comment.update(
        { body },
        {
          where: {
            id: commentId,
          },
        },
      );
      res.status(200).json({
        msg: 'Comment updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        msg: 'An error occurred',
      });
    }
  },
};
