const { Router } = require("express");
const router = Router();

const { checkRole } = require("../middlewares/check.role");

const { updateCategoryById } = require("../controllers/category");

router.put("/:id", checkRole, updateCategoryById);

module.exports = router;
