'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config');
var bcrypt = require('bcrypt-nodejs');

var tokenForUser = function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signup = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var email, username, password, user, newUser;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            username = req.body.username;
            password = req.body.password;

            if (!(!email || !password)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', res.status(422).send({ error: 'Email and Password Must Be Provided' }));

          case 5:
            _context.prev = 5;
            _context.next = 8;
            return User.findOneAsync({ email: email });

          case 8:
            user = _context.sent;

            if (!user) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', res.status(422).send({ error: 'Email Already In Use' }));

          case 11:
            newUser = new User({ email: email, password: password, username: username });


            bcrypt.genSalt(10, function (err, salt) {
              if (err) return next(err);
              bcrypt.hash(newUser.password, salt, null, function (err, hash) {
                if (err) return next(err);
                newUser.password = hash;
                newUser.save(function (err) {
                  if (err) return next(err);
                  res.json({ token: tokenForUser(newUser) });
                });
              });
            });
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](5);

            res.send(_context.t0);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[5, 15]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.signin = function (req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.getUser = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var token, user, decoded, _user;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.headers.authorization;
            user = void 0;

            if (!token) {
              _context2.next = 18;
              break;
            }

            _context2.prev = 3;
            decoded = jwt.decode(token, config.secret);
            _context2.next = 7;
            return User.findByIdAsync(decoded.sub);

          case 7:
            _user = _context2.sent;

            if (_user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt('return', res.send('No User'));

          case 10:
            res.send(_user);
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](3);
            return _context2.abrupt('return', res.status(401).send('authorization required'));

          case 16:
            _context2.next = 19;
            break;

          case 18:
            res.send({ user: "NO_USER" });

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 13]]);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserProfile = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var user;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return User.findByIdAsync(req.params.id);

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt('return', res.send('no user'));

          case 6:
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);

            res.send(_context3.t0);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 8]]);
  }));

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.editInfo = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
    var data, newPhone, newEmail, user;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = JSON.parse(req.body.data);
            newPhone = data.phoneNumber, newEmail = data.email;
            _context4.prev = 2;
            _context4.next = 5;
            return User.findByIdAsync(data.user);

          case 5:
            user = _context4.sent;

            if (user) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt('return', res.send('No User'));

          case 8:

            user.phoneNumber = newPhone || user.phoneNumber;
            user.email = newEmail || user.email;

            user.save();
            res.send(user);
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4['catch'](2);

            res.send(_context4.t0);

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[2, 14]]);
  }));

  return function (_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.addFollower = function (req, res) {
  var token = req.headers.authorization;
  if (token) {
    try {
      var decoded = jwt.decode(token, config.secret);
      User.findByIdAndUpdate(decoded.sub, { $addToSet: { "following": req.body.user } }, { safe: true, upsert: true }, function (err, user) {
        if (err) res.send(err);
        res.send(user);
      });
    } catch (e) {
      return res.status(401).send('authorization required');
    }
  } else {
    res.send({ user: "NO_USER" });
  }
};
exports.removeFollower = function (req, res) {
  var token = req.headers.authorization;
  if (token) {
    try {
      var decoded = jwt.decode(token, config.secret);
      User.findByIdAndUpdate(decoded.sub, { $pull: { "following": req.body.user } }, { multi: true }, function (err, user) {
        if (err) res.send(err);
        res.send(user);
      });
    } catch (e) {
      return res.status(401).send('authorization required');
    }
  } else {
    res.send({ user: "NO_USER" });
  }
};