'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Group = require('../models/group');
var randomKeyGen = require('../services/randomkeygen');

var groupCreatorController = function groupCreatorController(req, res, data) {
  var shareId = randomKeyGen(6);

  Group.findOne({ shareId: shareId }, function (error, checkGroup) {
    if (error) res.send(error);
    if (!checkGroup) {
      data.shareId = shareId;
      Group.create(data, function (err, group) {
        if (err) res.send(err);
        User.findById(data.creatorId, function (e, user) {
          if (e) res.send(e);
          user.groups.push(group._id);
          user.save();
          group.save();
          res.json(group);
        });
      });
    } else {
      groupCreatorController(req, res, data);
    }
  });
};
exports.createGroup = function (req, res) {
  var data = {
    name: req.body.name,
    creatorId: req.body.user._id,
    memberList: [req.body.user]
  };

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

exports.joinGroup = function (req, res) {
  Group.findById(req.params.id, function (err, group) {
    if (err) res.send(err);
    User.findById(req.body.user._id, function (err, user) {
      if (!user.groups[group._id]) {
        user.groups.push(group);
        user.save();
      }if (!group.memberList[user._id]) {
        group.memberList.push(user);
        group.save();
      }
      res.send(group);
    });
  });
};