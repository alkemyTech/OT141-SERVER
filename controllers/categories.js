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

module.exports = {
  createCategory,
};
