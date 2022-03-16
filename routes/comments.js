const router = require('express').Router();
// Middleware validations required
const { verifyToken } = require('../middlewares');

// Controller Api required
const { remove } = require('../controllers/comment.controller');

// Routes
// Update comment
router.delete(
  '/:id',
  verifyToken,
  remove,
);

module.exports = router;
