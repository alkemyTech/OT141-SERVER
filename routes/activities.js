const router = require("express").Router();

// Middleware validations required
const activityValidation = require("../middlewares/activity.validations");

// Controller Api required
const { store } = require("../controllers/activity.controller");

// Routes
router.post("/", activityValidation, store);

module.exports = router;
