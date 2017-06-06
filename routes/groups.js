var express = require('express');
var router = express.Router();

const GroupController = require('../controllers/group');

router.post('/new', GroupController.createGroup);

module.exports = router;
