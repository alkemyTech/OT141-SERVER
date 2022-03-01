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

module.exports = {
  createCategory,
};
