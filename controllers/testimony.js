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

const removeTestimony = async (req, res) => {
  try {
    const { id } = req.params;
    // As paranoid at model is setted to true, destroy method will make a soft delete;
    const TestimonialDeleted = await db.Testimonial.destroy({
      where: {
        id,
      },
    });
    if (TestimonialDeleted) {
     return res.status(200).json({
        ok: true,
        message: 'The testimony deleted successfully.',
      });
    } 
      res.status(404).json({
        ok: false,
        message: 'The testimony does not exist.',
      });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTestimony,
  updateTestimony,
  removeTestimony,
};
