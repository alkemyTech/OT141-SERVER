const db = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const { roleId } = req.user;
    const nameUpperCase = name.toUpperCase();

    // validate if user is admin
    if (roleId !== 1) {
      res.status(401).json({
        ok: false,
        msg: 'You do not have privileges for this',
      });
    }

    // validate if exist description and img
    if (description && image) {
      const newCategory = await db.category.create({
        name: nameUpperCase,
        description,
        image,
      });

      return res.status(201).json({
        ok: true,
        msg: `Created ${newCategory.name} category`,
      });
    }

    if (description) {
      const newCategory = await db.category.create({
        name: nameUpperCase,
        description,
      });

      return res.status(201).json({
        ok: true,
        msg: `Created ${newCategory.name} category`,
      });
    }
    if (image) {
      const newCategory = await db.category.create({
        name: nameUpperCase,
        image,
      });

      return res.status(201).json({
        ok: true,
        msg: `Created ${newCategory.name} category`,
      });
    }

    const newCategory = await db.category.create({
      name: nameUpperCase,
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
    const { roleId } = req.user;

    // validate if user is admin
    if (roleId !== 1) {
      res.status(401).json({
        ok: false,
        msg: 'You do not have privileges for this',
      });
    }

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
