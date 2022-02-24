const router = require("express").Router();

// Middleware validations required
const {
  validationsActivities,
  indexValidation,
  checkRol,
} = require("../middlewares/index.validations");

// Controller Api required
const { store, update } = require("../controllers/activity.controller");

// Routes
router.post("/", checkRol, validationsActivities, indexValidation, store);
router.put("/:id",checkRol, update);

module.exports = router;
