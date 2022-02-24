const db = require("../models");

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Category.findOne({
      where: { id },
    });
    res.status(200).json({
      message: "Category found",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
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
      }
    );
    res.status(200).json({
      message: "Category updated",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCategoryById,
  updateCategoryById,
};
