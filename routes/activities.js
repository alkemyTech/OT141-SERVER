const router = require("express").Router();

// Middleware validations required
const {
  validationsActivities,
  indexValidation,
  checkAuth
} = require("../middlewares/index.validations");

// Controller Api required
const { store, update } = require("../controllers/activity.controller");

// Routes
router.post("/", checkAuth, validationsActivities, indexValidation, store);
router.put("/:id", checkAuth, update);

module.exports = router;
