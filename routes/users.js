const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

const {
  verifyToken,
  checkRole,
} = require('../middlewares');

/* GET users listing. */
router.get(
  '/',
  verifyToken,
  checkRole,
  userController.list,
);

/* PATCH user */
router.patch('/:id', userController.update);

// delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
