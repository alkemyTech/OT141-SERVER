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

    res.status(201).json({
      ok: true,
      msg: `Created ${newCategory.name} category`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
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

    if (categories.length === 0 || !categories) {
      return res.status(404).json({
        ok: false,
        msg: 'There are no categories created',
      });
    }

    res.status(200).json({
      ok: true,
      count: categories.length,
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      msg: 'Contact to administrator',
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
