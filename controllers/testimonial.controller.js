const db = require('../models');

module.exports = {
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      // As paranoid at model is setted to true, destroy method will make a soft delete;
      const TestimonialDeleted = await db.Testimonial.destroy({
        where: {
          id,
        },
      });
      if (TestimonialDeleted) {
        res.status(200).json({
          ok: true,
          message: 'The testimony deleted successfully.',
        });
      } else {
        res.status(404).json({
          ok: false,
          message: 'The testimony does not exist.',
        });
      }
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  },
};
