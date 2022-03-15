const db = require('../models');

const createMember = async (req, res) => {
  try {
    const { name, image } = req.body;
    const nameUpperCase = name.toUpperCase();

    const newMember = await db.member.create({
      name: nameUpperCase,
      image,
    });

    return res.status(201).json({
      ok: true,
      msg: `Created ${newMember.name} member`,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Contact to administrator',
    });
  }
};

module.exports = {
  createMember,
};
