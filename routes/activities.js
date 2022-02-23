const router = require("express").Router();

// Middleware validations required
const {validationsActivities,indexValidation} = require("../middlewares/index.validations");


// Controller Api required
const { store } = require("../controllers/activity.controller");

// Routes
router.post("/", validationsActivities, indexValidation, store);

module.exports = router;
