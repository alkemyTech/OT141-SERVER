const db = require("../models");

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
  updateCategoryById,
};
