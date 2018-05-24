var express = require('express');
var router = express.Router();

var teseController = require('../controllers/teseController.js');

router.route('/')
  .get(teseController.getTeses);

router.route('/:teseId')
  .get(teseController.getTese);

module.exports = router;
