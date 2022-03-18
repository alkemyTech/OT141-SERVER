const db = require('../models');

const updateNew = async (req, res) => {
  const { id } = req.params;
  const { name, content, image } = req.body;

  try {
    const newDb = await db.News.update(
      {
        name,
        content,
        image,
      },
      {
        where: { id },
      },
    );
    if (!newDb) {
      return res.status(404).json({
        message: 'New not found',
      });
    }
    return res.status(200).json({
      message: 'New updated',
      newDb,
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
  updateNew,
};
