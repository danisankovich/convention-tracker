'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _convention = require('../models/convention');

var _convention2 = _interopRequireDefault(_convention);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _convention3 = require('../controllers/convention');

var _convention4 = _interopRequireDefault(_convention3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/convention/:id', _convention4.default.findOneConvention);
router.get('/all', _convention4.default.findAllConventions);
router.post('/myconventions', _convention4.default.findMyConventions);
router.post('/new', _convention4.default.newConvention);
router.post('/editConvention', _convention4.default.editConvention);
router.delete('/deleteConvention/:id', _convention4.default.removeConventionFromMyList);
router.post('/joinConvention/:id', _convention4.default.joinConvention);
module.exports = router;