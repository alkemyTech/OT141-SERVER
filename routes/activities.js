const router = require("express").Router();

// Middleware validations required
const activityValidation = require("../validations/activity.validations");

// Controller Api required
const { store } = require("../controllers/activity.controller");

// Routes
router.post("/add", activityValidation, store);

module.exports = router;
