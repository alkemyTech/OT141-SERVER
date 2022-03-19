const router = require('express').Router();
const { createTestimony, updateTestimony, getTestimonials } = require('../controllers/testimony');

const {
  verifyToken,
  checkAdminRole,
  validationsTestimony,
  validateErrors,
} = require('../middlewares');

router.get(
  '/',
  verifyToken,
  getTestimonials,
);

// Create testimony
router.post(
  '/',
  verifyToken,
  checkAdminRole,
  validationsTestimony,
  validateErrors,
  createTestimony,
);

// update testimony
router.put(
  '/:id',
  verifyToken,
  checkAdminRole,
  validationsTestimony,
  validateErrors,
  updateTestimony,
);

module.exports = router;