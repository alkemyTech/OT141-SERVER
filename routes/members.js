const express = require('express');

const router = express.Router();
const { createMember } = require('../controllers');
const {
  newMemberValidations,
  validateErrors,
} = require('../middlewares');

// Create member
router.post(
  '/',
  newMemberValidations,
  validateErrors,
  createMember,
);

module.exports = router;
