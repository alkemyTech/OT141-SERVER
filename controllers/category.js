const { LIMIT_PAGE } = require('../constants/limit-page.constants');
const { paginated } = require('../helpers/paginated');
const db = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const nameUpperCase = name.toUpperCase();

    const newCategory = await db.Category.create({
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
    const { page = 1 } = req.query;
    const categories = await db.category.findAll();

    // parameters  (array,limit,page,request)
    const { results, next, prev } = paginated(categories, LIMIT_PAGE, +page, req);

    if (results.length === 0) {
      return res.status(204).json({
        ok: false,
        msg: 'There are no categories created',
      });
    }
    res.status(200).json({ prev, next, results });
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
