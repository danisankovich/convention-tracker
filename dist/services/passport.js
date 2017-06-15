'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _passportJwt = require('passport-jwt');

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localOptions = { usernameField: 'email' };
var localLogin = new _passportLocal2.default(localOptions, function (email, password, done) {
  _user2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

// JWT Strategy Options
var jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization'), //looks at request header for a token
  secretOrKey: _config2.default.secret
};

// Create jwt strategy and see if user Id from payload exists in database.
var jwtLogin = new _passportJwt.Strategy(jwtOptions, function (payload, done) {
  _user2.default.findById(payload.sub, function (err, user) {
    //if err, call done with eror and no user
    if (err) {
      return done(err, false);
    }
    // if authenticated and yes user, call done with null error and a user
    if (user) {
      done(null, user);
    }
    // if not authenticated, but no error
    else {
        done(null, false);
      }
  });
});

_passport2.default.use(jwtLogin);
_passport2.default.use(localLogin);