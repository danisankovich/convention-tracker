'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Group = require('../models/group');
var Convention = require('../models/convention');


var randomKeyGen = require('../services/randomkeygen');

var groupCreatorController = function groupCreatorController(req, res, data) {
  var shareId = randomKeyGen(6);

  Group.findOne({ shareId: shareId }, function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(error, checkGroup) {
      var group, users, creator;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (error) res.send(error);

              if (checkGroup) {
                _context2.next = 28;
                break;
              }

              data.shareId = shareId;

              _context2.prev = 3;
              _context2.next = 6;
              return Group.createAsync(data);

            case 6:
              group = _context2.sent;

              if (!group) res.send('No Group Found');

              _context2.next = 10;
              return User.findAsync({ '_id': { $in: data.invitedList } });

            case 10:
              users = _context2.sent;
              _context2.next = 13;
              return _promise2.default.all(users.map(function () {
                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(u) {
                  var updated;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return User.updateAsync({ "_id": u._id }, { "$push": { "invitedToGroups": group._id } });

                        case 2:
                          updated = _context.sent;

                          if (!updated) res.send('User Update Failed');

                        case 4:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 13:
              console.log(data.creatorId);
              _context2.next = 16;
              return User.findByIdAndUpdateAsync(data.creatorId, { "$push": { "groups": group._id } });

            case 16:
              creator = _context2.sent;

              console.log(creator);
              if (!creator) res.send('User Update Failed');

              group.save();
              res.json(group);
              _context2.next = 26;
              break;

            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2['catch'](3);

              res.send(_context2.t0);

            case 26:
              _context2.next = 29;
              break;

            case 28:
              groupCreatorController(req, res, data);

            case 29:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[3, 23]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
exports.createGroup = function (req, res) {
  var data = {
    name: req.body.name,
    affiliation: req.body.affiliation,
    notes: req.body.notes,
    creatorId: req.body.userId,
    creatorName: req.body.username,
    invitedList: JSON.parse(req.body.invitedUsers),
    memberList: [req.body.userId]
  };
  data.invitedList = _lodash2.default.map(data.invitedList, function (user, key) {
    return key;
  });

  groupCreatorController(req, res, data);
};

exports.findByShareId = function (req, res) {
  Group.findOne({ shareId: req.params.id }, function (err, group) {
    if (err) res.send(err);
    if (!group) {
      res.send('No Group Found With Id ' + shareId);
    }
    res.send(group);
  });
};

exports.findById = function (req, res) {
  Group.findById(req.params.id, function (err, group) {
    if (err) res.send(err);
    res.send(group);
  });
};

exports.inviteToGroup = function (req, res) {
  Group.findById(req.params.id, function (err, group) {
    if (err) res.send(err);
    User.findById(req.body._id, function (err, user) {
      if (user.groups.indexOf(group._id) === -1 && user.invitedToGroups.indexOf(group._id) === -1) {
        user.invitedToGroups.push(group._id);
        user.save();
      }if (group.memberList.indexOf(req.body._id) === -1 && group.invitedList.indexOf(req.body._id) === -1) {
        group.invitedList.push(req.body._id);
        group.save();
      }
      res.send(group);
    });
  });
};

exports.findMyGroups = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var token, decoded, user, groupIds, groups;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.headers.authorization;

            if (!token) {
              _context3.next = 21;
              break;
            }

            _context3.prev = 2;
            decoded = _jwtSimple2.default.decode(token, _config2.default.secret);
            _context3.next = 6;
            return User.findByIdAsync(decoded.sub);

          case 6:
            user = _context3.sent;
            groupIds = req.query.type === 'invites' ? user.invitedToGroups : user.groups;
            _context3.next = 10;
            return Group.findAsync({ '_id': { $in: groupIds } });

          case 10:
            groups = _context3.sent;

            if (user) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt('return', res.send('No User'));

          case 13:

            res.send(groups);
            _context3.next = 19;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3['catch'](2);
            return _context3.abrupt('return', res.status(401).send('authorization required'));

          case 19:
            _context3.next = 22;
            break;

          case 21:
            res.send({ user: "NO_USER" });

          case 22:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[2, 16]]);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var findOneGroupHelper = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(groupId) {
    var conventionIds, conMemberTracker, group, members, conventions;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            conventionIds = [];
            conMemberTracker = {};
            _context6.next = 4;
            return Group.findByIdAsync(groupId);

          case 4:
            group = _context6.sent;
            _context6.next = 7;
            return _promise2.default.all(group.memberList.map(function () {
              var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(memberId) {
                var member;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return User.findByIdAsync(memberId);

                      case 2:
                        member = _context4.sent;

                        member.myConventions.forEach(function (con) {
                          if (conventionIds.indexOf(con.toString()) === -1) {
                            conMemberTracker[con.toString()] = [member.username];
                            conventionIds.push(con.toString());
                          } else {
                            conMemberTracker[con.toString()].push(member.username);
                          }
                        });
                        return _context4.abrupt('return', member);

                      case 5:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function (_x7) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 7:
            members = _context6.sent;
            _context6.next = 10;
            return _promise2.default.all(conventionIds.map(function () {
              var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(conId) {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return Convention.findByIdAsync(conId);

                      case 2:
                        return _context5.abrupt('return', _context5.sent);

                      case 3:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x8) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 10:
            conventions = _context6.sent;
            return _context6.abrupt('return', { group: group, members: members, conventions: conventions, conMemberTracker: conMemberTracker });

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function findOneGroupHelper(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findOneGroup = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res) {
    var _ref8, group, members, conventions, conMemberTracker;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return findOneGroupHelper(req.params.id);

          case 3:
            _ref8 = _context7.sent;
            group = _ref8.group;
            members = _ref8.members;
            conventions = _ref8.conventions;
            conMemberTracker = _ref8.conMemberTracker;

            res.send({ group: group, members: members.filter(Boolean), conventions: conventions, conMemberTracker: conMemberTracker });
            _context7.next = 14;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7['catch'](0);

            res.send(_context7.t0);

          case 14:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 11]]);
  }));

  return function (_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

exports.joinGroupTwo = function () {
  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res) {
    var groupId, token, decoded, userToUpdate, groupToUpdate, groupIndex, userIndex, _ref10, group, members, conventions, conMemberTracker;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            groupId = req.body.groupId;
            token = req.headers.authorization;

            console.log('asdasdf');

            if (!token) {
              _context8.next = 37;
              break;
            }

            _context8.prev = 4;
            decoded = _jwtSimple2.default.decode(token, _config2.default.secret);
            _context8.next = 8;
            return User.findByIdAsync(decoded.sub);

          case 8:
            userToUpdate = _context8.sent;

            if (userToUpdate) {
              _context8.next = 11;
              break;
            }

            return _context8.abrupt('return', res.send('No User'));

          case 11:
            _context8.next = 13;
            return Group.findByIdAsync(groupId);

          case 13:
            groupToUpdate = _context8.sent;

            if (groupToUpdate) {
              _context8.next = 16;
              break;
            }

            return _context8.abrupt('return', res.send('No Group'));

          case 16:
            groupIndex = userToUpdate.invitedToGroups.indexOf(groupToUpdate._id);

            if (groupIndex > -1) {
              userToUpdate.invitedToGroups.splice(groupIndex, 1);
              userToUpdate.groups.push(groupToUpdate._id);
            }

            userIndex = groupToUpdate.invitedList.indexOf(userToUpdate._id);


            if (userIndex > -1) {
              groupToUpdate.invitedList.splice(userIndex, 1);
              groupToUpdate.memberList.push(userToUpdate._id);
            }

            userToUpdate.save();
            groupToUpdate.save();

            _context8.next = 24;
            return findOneGroupHelper(groupId);

          case 24:
            _ref10 = _context8.sent;
            group = _ref10.group;
            members = _ref10.members;
            conventions = _ref10.conventions;
            conMemberTracker = _ref10.conMemberTracker;


            res.send({ group: group, members: members, conventions: conventions, conMemberTracker: conMemberTracker });

            _context8.next = 35;
            break;

          case 32:
            _context8.prev = 32;
            _context8.t0 = _context8['catch'](4);
            return _context8.abrupt('return', res.status(401).send('authorization required'));

          case 35:
            _context8.next = 38;
            break;

          case 37:
            res.send({ user: "NO_USER" });

          case 38:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[4, 32]]);
  }));

  return function (_x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();