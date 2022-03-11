const db = require('../models');

const createTestimony = async (req, res) => {
  const { name, content, image } = req.body;

  try {
    const testimonyCreated = await db.Testimony.create({
      name,
      content,
      image,
    });
    res.status(201).json({
      meta: {
        status: 201,
        ok: true,
      },
      data: testimonyCreated,
      errors: null,
    });
  } catch (error) {
    res.status(503).json({
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
  createTestimony,
};
