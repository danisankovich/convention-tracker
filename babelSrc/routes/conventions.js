var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');


const Convention = require('../models/convention');
const User = require('../models/user');

const ConventionController = require('../controllers/convention');

router.get('/convention/:id', ConventionController.findOneConvention);
router.get('/all', ConventionController.findAllConventions);
router.post('/myconventions', ConventionController.findMyConventions);
router.post('/new', ConventionController.newConvention);
router.post('/editConvention', ConventionController.editConvention);
router.delete('/deleteConvention/:id', ConventionController.deleteConvention);
module.exports = router;
