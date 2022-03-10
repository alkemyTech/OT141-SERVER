const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

const {
  verifyToken,
  checkAdminRole,
} = require('../middlewares');

/* GET users listing. */
router.get(
  '/',
  verifyToken,
  checkAdminRole,
  userController.list,
);

/* PATCH user */
router.patch(
  '/:id',
  userController.update,
);

// delete user
router.delete(
  '/:id',
  userController.deleteUser,
);

module.exports = router;
