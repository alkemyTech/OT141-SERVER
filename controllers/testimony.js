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

const updateTestimony = async (req, res) => {
  const { name, content, image } = req.body;
  const { id } = req.params;
  try {
    const testimonyDb = await db.Testimony.findByPk(id);
    if (!testimonyDb) {
      return res.status(404).json({
        message: 'Testimony not found',
      });
    }
    await testimonyDb.update(
      {
        name,
        content,
        image,
      },
    );
    return res.status(200).json({
      message: 'Testimony updated successfully',
      data: {
        ...testimonyDb, name, image, content,
      },
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
  createTestimony,
  updateTestimony,
};
