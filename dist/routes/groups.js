'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _group = require('../controllers/group');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/find/:id', _group2.default.findByShareId);
router.get('/all', _group2.default.findMyGroups);
router.get('/group/:id', _group2.default.findOneGroup);
router.post('/inviteToGroup/:id', _group2.default.inviteToGroup);
router.post('/new', _group2.default.createGroup);
router.post('/join', _group2.default.joinGroupTwo);
router.post('/leave', _group2.default.leaveGroup);
module.exports = router;