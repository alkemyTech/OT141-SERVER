const { Router } = require("express");
const router = Router();

const { checkRole } = require("../middlewares/check.role");

const { getCategoryById } = require("../controllers/category");

router.get("/:id", checkRole, getCategoryById);

module.exports = router;
