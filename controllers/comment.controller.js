const db = require('../models');

module.exports = {
  listByPost: async (req, res) => {
    // const variables
    const { id: post_id } = req.params;
    try {
      const comments = await db.Comment.findAll({
        where: { post_id },
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
};
