var express = require('express');
var router = express.Router();

const GroupController = require('../controllers/group');

router.get('/find/:id', GroupController.findByShareId);
router.post('/new', GroupController.createGroup);

module.exports = router;
