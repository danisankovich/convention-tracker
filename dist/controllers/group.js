'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _group = require('../models/group');

var _group2 = _interopRequireDefault(_group);

var _convention = require('../models/convention');

var _convention2 = _interopRequireDefault(_convention);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _randomkeygen = require('../services/randomkeygen');

var _randomkeygen2 = _interopRequireDefault(_randomkeygen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupCreatorController = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, data) {
    var shareId, checkGroup, group, users, creator;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            shareId = (0, _randomkeygen2.default)(6);
            _context2.next = 3;
            return _group2.default.findOneAsync({ shareId: shareId });

          case 3:
            checkGroup = _context2.sent;

            if (checkGroup) {
              _context2.next = 29;
              break;
            }

            data.shareId = shareId;

            _context2.prev = 6;
            _context2.next = 9;
            return _group2.default.createAsync(data);

          case 9:
            group = _context2.sent;

            if (!group) res.send('No Group Found');

            _context2.next = 13;
            return _user2.default.findAsync({ '_id': { $in: data.invitedList } });

          case 13:
            users = _context2.sent;
            _context2.next = 16;
            return _promise2.default.all(users.map(function () {
              var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(u) {
                var updated;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _user2.default.updateAsync({ "_id": u._id }, { "$push": { "invitedToGroups": group._id } });

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

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 16:
            _context2.next = 18;
            return _user2.default.findByIdAndUpdateAsync(data.creatorId, { "$push": { "groups": group._id } });

          case 18:
            creator = _context2.sent;


            if (!creator) res.send('User Update Failed');

            group.save();
            res.json(group);
            _context2.next = 27;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2['catch'](6);

            res.send(_context2.t0);

          case 27:
            _context2.next = 30;
            break;

          case 29:
            groupCreatorController(req, res, data);

          case 30:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[6, 24]]);
  }));

  return function groupCreatorController(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
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

exports.findByShareId = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var group;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _group2.default.findOneAsync({ shareId: req.params.id });

          case 3:
            group = _context3.sent;


            if (!group) {
              res.send('No Group Found With Id ' + shareId);
            }
            res.send(group);
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

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findById = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
    var group;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _group2.default.findByIdAsync(req.params.id);

          case 3:
            group = _context4.sent;

            if (!group) res.send('No Group Found');
            res.send(group);
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](0);

            res.send(_context4.t0);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 8]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.inviteToGroup = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res) {
    var group, user;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _group2.default.findByIdAsync(req.params.id);

          case 3:
            group = _context5.sent;

            if (!group) res.send('no group found');
            _context5.next = 7;
            return _user2.default.findByIdAsync(req.body._id);

          case 7:
            user = _context5.sent;

            if (!user) res.send('no user found');

            if (user.groups.indexOf(group._id) === -1 && user.invitedToGroups.indexOf(group._id) === -1) {
              user.invitedToGroups.push(group._id);
              user.save();
            }if (group.memberList.indexOf(req.body._id) === -1 && group.invitedList.indexOf(req.body._id) === -1) {
              group.invitedList.push(req.body._id);
              group.save();
            }
            res.send(group);
            _context5.next = 17;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5['catch'](0);

            res.send(_context5.t0);

          case 17:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 14]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.findMyGroups = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res) {
    var token, decoded, user, groupIds, groups;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            token = req.headers.authorization;

            if (!token) {
              _context6.next = 21;
              break;
            }

            _context6.prev = 2;
            decoded = _jwtSimple2.default.decode(token, _config2.default.secret);
            _context6.next = 6;
            return _user2.default.findByIdAsync(decoded.sub);

          case 6:
            user = _context6.sent;
            groupIds = req.query.type === 'invites' ? user.invitedToGroups : user.groups;
            _context6.next = 10;
            return _group2.default.findAsync({ '_id': { $in: groupIds } });

          case 10:
            groups = _context6.sent;

            if (user) {
              _context6.next = 13;
              break;
            }

            return _context6.abrupt('return', res.send('No User'));

          case 13:

            res.send(groups);
            _context6.next = 19;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6['catch'](2);
            return _context6.abrupt('return', res.status(401).send('authorization required'));

          case 19:
            _context6.next = 22;
            break;

          case 21:
            res.send({ user: "NO_USER" });

          case 22:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[2, 16]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var findOneGroupHelper = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(groupId) {
    var conventionIds, conMemberTracker, group, members, conventions;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            conventionIds = [];
            conMemberTracker = {};
            _context9.next = 4;
            return _group2.default.findByIdAsync(groupId);

          case 4:
            group = _context9.sent;
            _context9.next = 7;
            return _promise2.default.all(group.memberList.map(function () {
              var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(memberId) {
                var member;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return _user2.default.findByIdAsync(memberId);

                      case 2:
                        member = _context7.sent;

                        member.myConventions.forEach(function (con) {
                          if (conventionIds.indexOf(con.toString()) === -1) {
                            conMemberTracker[con.toString()] = [member.username];
                            conventionIds.push(con.toString());
                          } else {
                            conMemberTracker[con.toString()].push(member.username);
                          }
                        });
                        return _context7.abrupt('return', member);

                      case 5:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined);
              }));

              return function (_x14) {
                return _ref8.apply(this, arguments);
              };
            }()));

          case 7:
            members = _context9.sent;
            _context9.next = 10;
            return _promise2.default.all(conventionIds.map(function () {
              var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(conId) {
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return _convention2.default.findByIdAsync(conId);

                      case 2:
                        return _context8.abrupt('return', _context8.sent);

                      case 3:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, undefined);
              }));

              return function (_x15) {
                return _ref9.apply(this, arguments);
              };
            }()));

          case 10:
            conventions = _context9.sent;
            return _context9.abrupt('return', { group: group, members: members, conventions: conventions, conMemberTracker: conMemberTracker });

          case 12:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function findOneGroupHelper(_x13) {
    return _ref7.apply(this, arguments);
  };
}();

exports.findOneGroup = function () {
  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res) {
    var _ref11, group, members, conventions, conMemberTracker;

    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return findOneGroupHelper(req.params.id);

          case 3:
            _ref11 = _context10.sent;
            group = _ref11.group;
            members = _ref11.members;
            conventions = _ref11.conventions;
            conMemberTracker = _ref11.conMemberTracker;

            res.send({ group: group, members: members.filter(Boolean), conventions: conventions, conMemberTracker: conMemberTracker });
            _context10.next = 14;
            break;

          case 11:
            _context10.prev = 11;
            _context10.t0 = _context10['catch'](0);

            res.send(_context10.t0);

          case 14:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[0, 11]]);
  }));

  return function (_x16, _x17) {
    return _ref10.apply(this, arguments);
  };
}();

exports.joinGroupTwo = function () {
  var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(req, res) {
    var groupId, token, decoded, userToUpdate, groupToUpdate, groupIndex, userIndex, _ref13, group, members, conventions, conMemberTracker;

    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            groupId = req.body.groupId;
            token = req.headers.authorization;

            if (!token) {
              _context11.next = 36;
              break;
            }

            _context11.prev = 3;
            decoded = _jwtSimple2.default.decode(token, _config2.default.secret);
            _context11.next = 7;
            return _user2.default.findByIdAsync(decoded.sub);

          case 7:
            userToUpdate = _context11.sent;

            if (userToUpdate) {
              _context11.next = 10;
              break;
            }

            return _context11.abrupt('return', res.send('No User'));

          case 10:
            _context11.next = 12;
            return _group2.default.findByIdAsync(groupId);

          case 12:
            groupToUpdate = _context11.sent;

            if (groupToUpdate) {
              _context11.next = 15;
              break;
            }

            return _context11.abrupt('return', res.send('No Group'));

          case 15:
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

            _context11.next = 23;
            return findOneGroupHelper(groupId);

          case 23:
            _ref13 = _context11.sent;
            group = _ref13.group;
            members = _ref13.members;
            conventions = _ref13.conventions;
            conMemberTracker = _ref13.conMemberTracker;


            res.send({ group: group, members: members, conventions: conventions, conMemberTracker: conMemberTracker });

            _context11.next = 34;
            break;

          case 31:
            _context11.prev = 31;
            _context11.t0 = _context11['catch'](3);
            return _context11.abrupt('return', res.status(401).send('authorization required'));

          case 34:
            _context11.next = 37;
            break;

          case 36:
            res.send({ user: "NO_USER" });

          case 37:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[3, 31]]);
  }));

  return function (_x18, _x19) {
    return _ref12.apply(this, arguments);
  };
}();

exports.leaveGroup = function () {
  var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(req, res) {
    var groupId, token, decoded, group, user, groupIndex, userIndex;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            groupId = req.params.groupId;
            token = req.headers.authorization;

            if (!token) {
              _context12.next = 26;
              break;
            }

            decoded = _jwtSimple2.default.decode(token, _config2.default.secret);
            _context12.prev = 4;

            console.log(decoded, groupId);
            _context12.next = 8;
            return _group2.default.findByIdAsync(groupId);

          case 8:
            group = _context12.sent;

            if (!group) res.send('No Group Found');

            _context12.next = 12;
            return _user2.default.findByIdAsync(decoded.sub);

          case 12:
            user = _context12.sent;

            if (!user) res.send('No User Found');

            groupIndex = group.memberList.indexOf(decoded.sub);
            userIndex = user.groups.indexOf(groupId);

            group.memberList.splice(groupIndex, 1);
            user.groups.splice(userIndex, 1);

            user.save();
            group.save();
            return _context12.abrupt('return', res.send(group));

          case 23:
            _context12.prev = 23;
            _context12.t0 = _context12['catch'](4);
            return _context12.abrupt('return', res.send(end));

          case 26:
            return _context12.abrupt('return', res.send('Operation Failed'));

          case 27:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[4, 23]]);
  }));

  return function (_x20, _x21) {
    return _ref14.apply(this, arguments);
  };
}();