const { Router } = require("express");
const router = Router();

//uncomment line 5 after adding ticket 0141-27
//const {checkRol} = require('../middlewares/checkRol');

const { isCategoryIdInDB } = require("../middlewares/category");

const { getCategoryById } = require("../controllers/category");

//add middlware (checkRol) for valite Admin from ticket 0T141-27.
router.get("/:id", isCategoryIdInDB, getCategoryById);

module.exports = router;
