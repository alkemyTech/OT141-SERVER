const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const {
  verifyToken,
  checkAdminRole,
} = require('../middlewares');

// Get all comments
router.get(
  '/',
  verifyToken,
  checkAdminRole,
  commentController.list,
);

module.exports = router;
