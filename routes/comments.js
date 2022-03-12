const router = require('express').Router();

// Middleware validations required
// Controller Api required
const { listByPost } = require('../controllers/comment.controller');

// Routes
// Update comment
router.get(
  '/:id/comments',
  listByPost,
);

module.exports = router;
