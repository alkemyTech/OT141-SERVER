const db = require('../models');

const getNewById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await db.News.findOne({
      where: { id },
    });
    if (!news) {
      return res.status(404).json({
        ok: false,
        msg: 'The new does not exist',
      });
    }
    return res.status(200).json({
      message: 'New found',
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

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

module.exports = { createNew, getNewById };
