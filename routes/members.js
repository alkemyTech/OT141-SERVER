const router = require('express').Router();
const {
  list,
  createMember,
  deleteMember,
  updateMember,
} = require('../controllers/member');
const {
  verifyToken,
  checkAdminRole,
  newMemberValidations,
  validateErrors,
} = require('../middlewares');

router.get(
  '/',
  verifyToken,
  checkAdminRole,
  list,
);

// Create member
router.post(
  '/',
  verifyToken,
  checkAdminRole,
  newMemberValidations,
  validateErrors,
  createMember,
);

// delete member
router.delete(
  '/:id',
  verifyToken,
  checkAdminRole,
  deleteMember,
);
// Update member
router.put(
  '/:id',
  verifyToken,
  checkAdminRole,
  updateMember,
);

module.exports = router;
