const db = require('../models');

const createNew = async (req, res) => {
  try {
    const { name, content, image, categoryId } = req.body;
    if (!name || !content || !image || !categoryId) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }
    const newNews = await db.News.create({
      name,
      content,
      image,
      categoryId,
    });
    res.status(201).json({
      message: 'New created successfully',
      new: newNews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createNew };
