const router = require("express").Router();

// Middleware validations required
const {
  validationsActivities,
  indexValidation,
  checkTokenAuthorization
} = require("../middlewares/index.validations");

// Controller Api required
const { store, update } = require("../controllers/activity.controller");

// Routes
router.post("/", checkTokenAuthorization, validationsActivities, indexValidation, store);
router.put("/:id", checkTokenAuthorization, update);

module.exports = router;
