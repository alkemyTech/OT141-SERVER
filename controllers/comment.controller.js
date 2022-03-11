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
  create: async (req, res) => {
    try {
      const { post_id, user_id, body } = req.body; // eslint-disable-line
      const newComment = await db.Comment.create({
        post_id, // eslint-disable-line
        user_id, // eslint-disable-line
        body,
      });
      return res.status(201).json({
        message: 'comment created',
        comment: newComment,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
      });
    }
  },
};
