var express = require('express');
var router = express.Router();

var repositorioController = require('../controllers/repositorioController.js');

/* GET home page. */

router.route('/')
    .get(repositorioController.getRepositorios)
    .post(repositorioController.createRepositorio);

router.route('/:repId')
    .get(repositorioController.getRepositorio)
    .delete(repositorioController.deleteRepositorio)
    .put(repositorioController.updateRepositorio);

module.exports = router;
