const db = require("../models");

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Category.findOne({
      where: { id },
    });
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "The category does not exist",
      });
    }
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

module.exports = {
  getCategoryById,
};
