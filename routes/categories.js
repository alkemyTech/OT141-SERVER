const router = require('express').Router();
const {
  createCategory,
} = require('../controllers');
const {
  validateErrors,
  validationCreateCategory,
  verifyToken,
} = require('../middlewares');

// Create category
router.post(
  '/',
  // verifyToken,
  validationCreateCategory,
  validateErrors,
  createCategory,
);

module.exports = router;
