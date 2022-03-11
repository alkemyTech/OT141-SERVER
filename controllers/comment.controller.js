const db = require('../models');

module.exports = {
  list: async (req, res) => {
    try {
      const comments = await db.Comment.findAll({
        attributes: ['body'],
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      return res.status(200).json({
        message: 'list of comments',
        count: comments.length,
        comments,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
      });
    }
  },
};
