const { LIMIT_PAGE } = require('../constants/limit-page.constants');
const { paginated } = require('../helpers/paginated');
const { uploadInBucket } = require('../helpers/uploadAWS-S3');
const db = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { Location: fileURL } = await uploadInBucket(req.files?.image);
    const nameUpperCase = name.toUpperCase();

    const newCategory = await db.Category.create({
      name: nameUpperCase,
      description: description || null,
      image: fileURL || 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
    });

    return res.status(201).json({
      ok: true,
      msg: `Created ${newCategory.name} category`,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Contact to administrator',
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const { results, next, prev } = await paginated(db.Category, LIMIT_PAGE, +page, req);
    if (results.length === 0) {
      return res.status(200).json({
        ok: false,
        msg: 'There are no categories created',
      });
    }
    return res.status(200).json({ prev, next, results });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Contact to administrator',
    });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { Location: fileURL } = await uploadInBucket(req.files?.image);
    const { name, description } = req.body;
    const category = await db.Category.update(
      {
        name,
        description,
        image: fileURL && fileURL,
      },
      {
        where: { id },
      },
    );
    if (!category[0]) {
      return res.status(404).json({
        msg: 'Category not found',
      });
    }
    return res.status(200).json({
      msg: 'Category updated',
      data: {
        ...category.dataValues, name, description, fileURL,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Category.findOne({
      where: { id },
    });
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: 'The category does not exist',
      });
    }
    return res.status(200).json({
      message: 'Category found',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDeleted = await db.Category.destroy({
      where: {
        id,
      },
    });
    if (categoryDeleted === 1) {
      res.status(200).json({
        del: true,
        message: `category with id ${id}, was deleted successfully`,
      });
    } else {
      res.status(404).json({
        del: false,
        message: `the id ${id} does not correspond to any category`,
      });
    }
  } catch (error) {
    res.status(500).json({
      del: false,
      data: error,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategoryById,
  getCategoryById,
  deleteCategory,
};
