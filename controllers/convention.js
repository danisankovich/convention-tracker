'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');

var Convention = require('../models/convention');
var User = require('../models/user');

exports.findOneConvention = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var convention;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            convention = void 0;
            _context.prev = 1;
            _context.next = 4;
            return Convention.findByIdAsync(req.params.id);

          case 4:
            convention = _context.sent;

            res.send(convention);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);

            res.send(_context.t0);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllConventions = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var conventions;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Convention.findAsync({});

          case 3:
            conventions = _context2.sent;

            res.send(conventions);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            res.send(err);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findMyConventions = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var data, conventions;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = JSON.parse(req.body.data);
            _context3.prev = 1;
            _context3.next = 4;
            return Convention.findAsync({ '_id': { $in: data } });

          case 4:
            conventions = _context3.sent;

            res.send(conventions);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](1);

            res.send(err);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.editConvention = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
    var updatedConvention, token, decoded, user, userId, convention;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            updatedConvention = JSON.parse(req.body.data).convention;
            token = req.headers.authorization;
            decoded = jwt.decode(token, config.secret);
            _context4.prev = 3;
            _context4.next = 6;
            return User.findByIdAsync(decoded.sub);

          case 6:
            user = _context4.sent;
            userId = user._id;
            _context4.next = 10;
            return Convention.findByIdAsync(updatedConvention._id);

          case 10:
            convention = _context4.sent;

            if (convention.creator.id != userId) {
              res.send('You do not have these permissions');
            } else {
              res.send(convention);
            }
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4['catch'](3);

            res.send(_context4.t0);

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[3, 14]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.newConvention = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res) {
    var data, convention, user;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            data = {
              name: req.body.name,
              location: {
                locationName: req.body.locationName,
                address: req.body.address,
                state: req.body.state,
                city: req.body.city,
                zipcode: req.body.zipcode,
                country: req.body.country
              },
              price: req.body.price,
              startdate: req.body.startdate,
              enddate: req.body.enddate,
              description: req.body.description,
              notes: req.body.notes,
              userId: req.body.user,
              email: req.body.email,
              username: req.body.username,
              creator: {
                id: req.body.user
              },
              attendees: [req.body.user]
            };
            _context5.prev = 1;
            _context5.next = 4;
            return Convention.createAsync(data);

          case 4:
            convention = _context5.sent;

            if (convention) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt('return', res.send('Error'));

          case 7:
            _context5.next = 9;
            return User.findByIdAsync(data.userId);

          case 9:
            user = _context5.sent;

            if (user) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt('return', res.send('Error'));

          case 12:

            user.myConventions.push(convention._id);
            user.save();

            res.json(convention);
            _context5.next = 20;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5['catch'](1);

            res.send(_context5.t0);

          case 20:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 17]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteConvention = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res) {
    var convention, token, decoded, user, index, conventionToRemove;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            convention = req.params.id;
            token = req.headers.authorization;
            decoded = jwt.decode(token, config.secret);
            _context6.prev = 3;
            _context6.next = 6;
            return User.findByIdAsync(decoded.sub);

          case 6:
            user = _context6.sent;

            if (user) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt('return', res.send('No User'));

          case 9:
            index = user.myConventions.indexOf(convention);
            _context6.next = 12;
            return Convention.findByIdAndRemoveAsync(convention);

          case 12:
            conventionToRemove = _context6.sent;

            if (convention) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt('return', res.send('Can\'t find convention'));

          case 15:

            if (index > -1) {
              user.myConventions.splice(index, 1);
              user.save(user);
              console.log(user.myConventions);
              res.send(user);
            } else {
              res.send('Convention not Found');
            }
            _context6.next = 21;
            break;

          case 18:
            _context6.prev = 18;
            _context6.t0 = _context6['catch'](3);

            res.send(_context6.t0);

          case 21:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[3, 18]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();