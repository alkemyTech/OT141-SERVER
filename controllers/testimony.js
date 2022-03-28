const { LIMIT_PAGE } = require('../constants/limit-page.constants');
const { paginated } = require('../helpers/paginated');
const { uploadInBucket } = require('../helpers/uploadAWS-S3');
const db = require('../models');

const createTestimony = async (req, res) => {
  const { name, content } = req.body;
  let fileURL;
  try {
    if (req.files?.image) {
      const { Location } = await uploadInBucket(req.files.image);
      fileURL = Location;
    }
    const testimonyCreated = await db.Testimony.create({
      name,
      content,
      image: fileURL || 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
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
  const { name, content } = req.body;
  const { id } = req.params;
  try {
    let fileURL;
    if (req.files?.image) {
      const { Location } = await uploadInBucket(req.files.image);
      fileURL = Location;
    }
    const isUpdate = await db.Testimony.update({
      name,
      content,
      image: fileURL && fileURL,
    }, {
      where: {
        id,
      },
    });
    if (isUpdate[0]) {
      return res.status(200).json({
        message: 'Testimony updated successfully',
        data: {
          name, image: fileURL, content,
        },
      });
    }
    return res.status(404).json({
      ok: false,
      message: 'Testimony not found',
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

const removeTestimony = async (req, res) => {
  try {
    const { id } = req.params;
    // As paranoid at model is setted to true, destroy method will make a soft delete;
    const TestimonialDeleted = await db.Testimony.destroy({
      where: {
        id,
      },
    });
    if (TestimonialDeleted) {
      return res.status(200).json({
        ok: true,
        message: 'Testimony deleted successfully.',
      });
    }
    return res.status(404).json({
      ok: false,
      message: 'Testimony not found',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const getTestimonials = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const { results, next, prev } = await paginated(db.Testimony, LIMIT_PAGE, +page, req);
    if (results.length === 0) {
      return res.status(200).json({
        ok: false,
        message: 'There are no testimonies',
      });
    }
    return res.status(200).json({
      prev,
      next,
      results,
    });
  } catch (err) {
    return res.status(503).json({
      meta: {
        status: 503,
        ok: false,
      },
      data: null,
      errors: { msg: 'Server not available' },
    });
  }
};

const getTestimonyById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Testimony.findOne({
      where: { id },
    });
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: 'The testimonial does not exist',
      });
    }
    return res.status(200).json({
      message: 'Testimonial found',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTestimony,
  updateTestimony,
  removeTestimony,
  getTestimonials,
  getTestimonyById,
};
