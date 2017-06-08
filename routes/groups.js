'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _group = require('../controllers/group');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/find/:id', _group2.default.findByShareId);
router.post('/new', _group2.default.createGroup);

module.exports = router;