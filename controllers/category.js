const db = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const nameUpperCase = name.toUpperCase();

    const newCategory = await db.category.create({
      name: nameUpperCase,
      description: description || null,
      image: image || null,
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
    const categories = await db.category.findAll({
      attributes: ['name'],
    });

    if (categories.length === 0) {
      return res.status(204).json({
        ok: false,
        msg: 'There are no categories created',
      });
    }

    return res.status(200).json({
      ok: true,
      count: categories.length,
      categories,
    });
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
    const { name, description, image } = req.body;
    const category = await db.Category.update(
      {
        name,
        description,
        image,
      },
      {
        where: { id },
      },
    );
    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }
    return res.status(200).json({
      message: 'Category updated',
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
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

module.exports = {
  createCategory,
  getAllCategories,
  updateCategoryById,
  getCategoryById,
};
