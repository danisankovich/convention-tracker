'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _authentication = require('../controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _passport = require('../services/passport');

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('passport');

var _passport4 = _interopRequireDefault(_passport3);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


var requireAuth = _passport4.default.authenticate('jwt', { session: false }); //token based, not session
var requireSignin = _passport4.default.authenticate('local', { session: false });
var authenticate = (0, _expressJwt2.default)({ secret: _config2.default.secret });

router.get('/api', requireAuth, _authentication2.default.getUser);
router.get('/api/checkUser', _authentication2.default.checkUser);
router.put('/api/addfollower', requireAuth, _authentication2.default.addFollower);
router.put('/api/removefollower', requireAuth, _authentication2.default.removeFollower);
router.get('/api/user/:id', _authentication2.default.getUserProfile);
router.post('/api/signup', _authentication2.default.signup);
router.post('/api/signin', requireSignin, _authentication2.default.signin);
router.post('/api/editInfo', _authentication2.default.editInfo);

module.exports = router;