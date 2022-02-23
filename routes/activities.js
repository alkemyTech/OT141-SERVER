const router = require('express').Router();

// controller Api required

const activityController = require('../controllers/activityController')

// Routes

router.put('/:id', activityController.update)

module.exports = router;