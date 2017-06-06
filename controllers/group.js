var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Group = require('../models/group');

const generateShareId = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 6; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
const groupCreatorController = (req, res, data) => {
  const shareId = generateShareId();

  Group.findOne({shareId: shareId}, (error, checkGroup) => {
    if (error) res.send(error)
    if (!checkGroup) {
      data.shareId = shareId;
      Group.create(data, (err, group) => {
        if (err) res.send(err);
        User.findById(data.creatorId, (e, user) => {
          if (e) res.send(e)
          user.groups.push(group._id)
          user.save();
          group.save();
          res.json(group);
        })
      })
    } else {
      groupCreatorController(req, res, data)
    }

  })
}
exports.createGroup = (req, res) => {
  var data = {
    name: req.body.name,
    creatorId: req.body.user._id,
    memberList: [req.body.user]
  }

  groupCreatorController(req, res, data);
}

exports.findByShareId = (req, res) => {
  Group.findOne({shareId: req.params.id}, (err, group) => {
    if (err) res.send(err)
    if (!group) {
      res.send(`No Group Found With Id ${shareId}`)
    }
    res.send(group);
  })
}
