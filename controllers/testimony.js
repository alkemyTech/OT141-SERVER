const db = require('../models');

const updateTestimony = async (req, res) => {
  const { name, content, image } = req.body;
  const { id } = req.params;
  try {
    const testimonyDb = await db.Testimony.update(
      {
        name,
        content,
        image,
      },
      {
        where: { id },
      },
    );

    if (!testimonyDb) {
      return res.status(404).json({
        message: 'Testimony not found',
      });
    }
    return res.status(200).json({
      message: 'Testimony updated',
      testimonyDb,
    });
  } catch (error) {
    return res.status(503).json({
      meta: {
        status: 503,
        ok: false,
      },
      data: null,
      errors: { msg: 'Server no disponible' },
    });
  }
};

module.exports = {
  updateTestimony,
};
