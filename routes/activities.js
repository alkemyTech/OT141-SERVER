const router = require('express').Router();
const { checkRole } = require('../middlewares');

// Middleware validations required
const {
  validationsActivities,
  indexValidation,
} = require('../middlewares/index.validations');

// Controller Api required
const { store, update } = require('../controllers/activity.controller');

// Routes
// Create activity
router.post(
  '/',
  checkRole,
  validationsActivities,
  indexValidation,
  store,
);

// Update activity
router.put(
  '/:id',
  checkRole,
  indexValidation,
  update,
);

module.exports = router;
