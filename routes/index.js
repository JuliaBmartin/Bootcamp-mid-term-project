var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');


router.get('/', indexControllers.viewHome);

router.get('/about', indexControllers.viewAbout);

router.get('/contacto', indexControllers.viewContact);

module.exports = router;
