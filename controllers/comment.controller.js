const db = require('../models');
const { ROLE_ADMIN } = require('../constants/user.constants');

module.exports = {
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
  listByPost: async (req, res) => {
    // const variables
    const { id: post_id } = req.params; // eslint-disable-line
    try {
      const comments = await db.Comment.findAll({
        where: { post_id }, // eslint-disable-line
        attributes: ['body'],
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        ok: true,
        comments,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error',
      });
    }
  },
  remove: async (req, res) => {
    const { roleId, id: user_id } = req.user.user;
    const { id: commentId } = req.params;

    try {
      const where = roleId === ROLE_ADMIN ? { id: commentId } : { id: commentId, user_id };
      const isDeleted = await db.Comment.destroy({ where });

      if (isDeleted) {
        return res.status(200).json({
          msg: 'Comment deleted successfully',
        });
      }

      return res.status(404).json({
        msg: 'The comment does not exist',
      });
    } catch (error) {
      return res.status(503).json({ msg: 'Server failure' });
    }
  },
};
