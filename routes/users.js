const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

const {
  verifyToken,
  checkAdminRole,
  checkOwnership, // TODO: Borrar. No es requerimiento por ahora (es solo para probar el middleware)
  validateErrors,
  validationUpdateUser,
} = require('../middlewares');

/* GET users listing. */
router.get(
  '/',
  verifyToken,
  checkAdminRole,
  validateErrors,
  userController.list,
);

/* PATCH user */
router.patch(
  '/:id',
  verifyToken,
  checkOwnership, // TODO: Borrar esta linea (es solo para probar el middleware)
  validationUpdateUser,
  validateErrors,
  userController.update,
);

// delete user
router.delete(
  '/:id',
  verifyToken,
  checkOwnership,
  userController.deleteUser,
);

module.exports = router;
