var express = require('express');
var router = express.Router();
const { deleteUser } = require("../controllers/users");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// delete user
router.delete('/:id', deleteUser);

module.exports = router;
