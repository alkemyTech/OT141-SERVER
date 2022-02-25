const router = require("express").Router();

// Middleware validations required
const { validationsActivities, indexValidation, validationsActivitiesUpdate } = require("../middlewares/index.validations");

// Controller Api required
const { store, update } = require("../controllers/activity.controller");

// Routes
router.post("/", validationsActivities, indexValidation, store);
router.put('/:id', validationsActivitiesUpdate, indexValidation, update)

module.exports = router;
