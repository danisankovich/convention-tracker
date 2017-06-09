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

  Group.findOne({shareId: shareId}, async (error, checkGroup) => {
    if (error) res.send(error)
    if (!checkGroup) {
      data.shareId = shareId;

      try {
        const group = await Group.createAsync(data);
        if (!group) res.send('No Group Found');

        const users = await User.findAsync({'_id': { $in: data.memberList}});

        await Promise.all(users.map(async (u) => {
          const updated = await User.updateAsync({ "_id": u._id}, { "$push": { "groups": group._id } });
          if (!updated) res.send('User Update Failed');
        }))

        group.save();
        res.json(group);
      } catch (err) {
        res.send(err);
      }
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
    creatorName: req.body.username,
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
    User.findById(req.body._id, (err, user) => {
      if (user.groups.indexOf(group._id) === -1) {
        user.groups.push(group._id);
        user.save();
      } if (group.memberList.indexOf(req.body._id) === -1) {
        group.memberList.push(req.body._id);
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

exports.findOneGroup = async (req, res) => {
  try {
    const conventionIds = [];
    const conMemberTracker = {};
    const group = await Group.findByIdAsync(req.params.id);
    const members = await Promise.all(group.memberList.map(async (memberId) => {
      const member = await User.findByIdAsync(memberId);
      member.myConventions.forEach((con) => {
        if (conventionIds.indexOf(con.toString()) === -1) {
          conMemberTracker[con.toString()] = [member.username];
          conventionIds.push(con.toString());
        } else {
          conMemberTracker[con.toString()].push(member.username);
        }
      });
      return member;
    }));

    const conventions = await Promise.all(conventionIds.map(async (conId) => {
      return await Convention.findByIdAsync(conId);
    }))

    res.send({group, members: members.filter(Boolean), conventions, conMemberTracker})
  } catch (e) {
    res.send(e)
  }
}
