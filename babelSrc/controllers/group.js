var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Group = require('../models/group');
var Convention = require('../models/convention');
import config from '../../config';
import jwt from 'jwt-simple';

import _ from 'lodash';

const randomKeyGen = require('../services/randomkeygen')

const groupCreatorController = (req, res, data) => {
  const shareId = randomKeyGen(6);

  Group.findOne({shareId: shareId}, (error, checkGroup) => {
    if (error) res.send(error)
    if (!checkGroup) {
      data.shareId = shareId;
      Group.create(data, async (err, group) => {
        if (err) res.send(err);

        const users = await User.findAsync({'_id': { $in: data.memberList}});
        users.forEach((u) => {
          User.update(
             { "_id": u._id},
             { "$push": { "groups": group._id } },
             (err, raw) => {
                if (err) return res.send(err);
                console.log('updated');
             }
          );
        })
        group.save();
        res.json(group);
      })
    } else {
      groupCreatorController(req, res, data)
    }
  })
}
exports.createGroup = (req, res) => {
  var data = {
    name: req.body.name,
    affiliation: req.body.affiliation,
    notes: req.body.notes,
    creatorId: req.body.userId,
    memberList: JSON.parse(req.body.groupUsers)
  }
  data.memberList = _.map(data.memberList, (user, key) => key);


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

exports.findById = (req, res) => {
  Group.findById(req.params.id, (err, group) => {
    if (err) res.send(err)
    res.send(group);
  })
}

exports.joinGroup = (req, res) => {
  Group.findById(req.params.id, (err, group) => {
    if (err) res.send(err)
    User.findById(req.body.user._id, (err, user) => {
      if (!user.groups[group._id]) {
        user.groups.push(group);
        user.save();
      } if (!group.memberList[user._id]) {
        group.memberList.push(user);
        group.save();
      }
      res.send(group);
    })
  })
}

exports.findMyGroups = async (req, res) => {
  const token = req.headers.authorization;
  if(token) {
    try {
      const decoded = jwt.decode(token, config.secret);

      const user = await User.findByIdAsync(decoded.sub);

      const groupIds = user.groups;

      const groups = await Group.findAsync({'_id': { $in: groupIds}});

      if (!user) return res.send('No User')

      res.send(groups);
    } catch (e) {
      return res.status(401).send('authorization required');
    }
  }
  else {
    res.send({user: "NO_USER"})
  }
}
