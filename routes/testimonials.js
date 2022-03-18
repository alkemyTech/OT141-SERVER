const router = require('express').Router();
const { remove } = require('../controllers/testimonial.controller');

// Delete testimony
router.delete(
  '/:id',
  remove,
);

module.exports = router;
