const db = require("../models");

async function isCategoryIdInDB(req, res, next) {
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
  next();
}

module.exports = {
  isCategoryIdInDB,
};
