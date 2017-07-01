import express, { Router } from 'express';
import jwt from 'jwt-simple';
import _ from 'lodash';

import User from '../models/user';
import Group from '../models/group';
import Convention from '../models/convention';
import config from '../../config';

import randomKeyGen from '../services/randomkeygen';

const groupCreatorController = async (req, res, data) => {
  const shareId = randomKeyGen(6);

  const checkGroup = await Group.findOneAsync({ shareId })

  if (!checkGroup) {
    data.shareId = shareId;

    try {
      const group = await Group.createAsync(data);
      if (!group) res.send('No Group Found');

      const users = await User.findAsync({'_id': { $in: data.invitedList}});

      await Promise.all(users.map(async (u) => {
        const updated = await User.updateAsync({ "_id": u._id}, { "$push": { "invitedToGroups": group._id } });
        if (!updated) res.send('User Update Failed');
      }));

      const creator = await User.findByIdAndUpdateAsync(data.creatorId, { "$push": { "groups": group._id } });

      if (!creator) res.send('User Update Failed');

      group.save();
      res.json(group);
    } catch (err) {
      res.send(err);
    }
  } else {
    groupCreatorController(req, res, data)
  }
}
exports.createGroup = (req, res) => {
  var data = {
    name: req.body.name,
    affiliation: req.body.affiliation,
    notes: req.body.notes,
    creatorId: req.body.userId,
    creatorName: req.body.username,
    invitedList: JSON.parse(req.body.invitedUsers),
    memberList: [req.body.userId]
  }
  data.invitedList = _.map(data.invitedList, (user, key) => key);

  groupCreatorController(req, res, data);
}

exports.findByShareId = async (req, res) => {
  try {
    const group = await Group.findOneAsync({shareId: req.params.id});

    if (!group) {
      res.send(`No Group Found With Id ${shareId}`)
    }
    res.send(group);
  } catch (err) {
    res.send(err);
  }
}

exports.findById = async (req, res) => {
  try {
    const group = await Group.findByIdAsync(req.params.id);
    if (!group) res.send('No Group Found');
    res.send(group);
  } catch (err) {
    res.send(err);
  }
}

exports.inviteToGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAsync(req.params.id);
    if (!group) res.send('no group found');
    const user = await User.findByIdAsync(req.body._id);
    if (!user) res.send('no user found');

    if (user.groups.indexOf(group._id) === -1 && user.invitedToGroups.indexOf(group._id) === -1) {
      user.invitedToGroups.push(group._id);
      user.save();
    } if (group.memberList.indexOf(req.body._id) === -1 && group.invitedList.indexOf(req.body._id) === -1) {
      group.invitedList.push(req.body._id);
      group.save();
    }
    res.send(group);
  } catch (err) {
    res.send(err);
  }
}

exports.findMyGroups = async (req, res) => {
  const token = req.headers.authorization;
  if(token) {
    try {
      const decoded = jwt.decode(token, config.secret);

      const user = await User.findByIdAsync(decoded.sub);

      const groupIds = (req.query.type === 'invites') ? user.invitedToGroups : user.groups;

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


const findOneGroupHelper = async (groupId) => {
  const conventionIds = [];
  const conMemberTracker = {};
  const group = await Group.findByIdAsync(groupId);

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

  return {group, members, conventions, conMemberTracker}
}


exports.findOneGroup = async (req, res) => {
  try {
    const {group, members, conventions, conMemberTracker} = await findOneGroupHelper(req.params.id);
    res.send({group, members: members.filter(Boolean), conventions, conMemberTracker})
  } catch (e) {
    res.send(e)
  }
}

exports.joinGroupTwo = async (req, res) => {
  const groupId = req.body.groupId;

  const token = req.headers.authorization;

  if(token) {
    try {
      let decoded = jwt.decode(token, config.secret);

      const userToUpdate = await User.findByIdAsync(decoded.sub);
      if (!userToUpdate) return res.send('No User')

      const groupToUpdate = await Group.findByIdAsync(groupId);
      if (!groupToUpdate) return res.send('No Group')

      const groupIndex = userToUpdate.invitedToGroups.indexOf(groupToUpdate._id);
      if (groupIndex > -1) {
        userToUpdate.invitedToGroups.splice(groupIndex, 1)
        userToUpdate.groups.push(groupToUpdate._id)
      }

      const userIndex = groupToUpdate.invitedList.indexOf(userToUpdate._id);

      if (userIndex > -1) {
        groupToUpdate.invitedList.splice(userIndex, 1)
        groupToUpdate.memberList.push(userToUpdate._id)
      }

      userToUpdate.save();
      groupToUpdate.save();

      const {group, members, conventions, conMemberTracker} = await findOneGroupHelper(groupId);

      res.send({group, members, conventions, conMemberTracker});

    } catch (e) {
      return res.status(401).send('authorization required');
    }
  }
  else {
    res.send({user: "NO_USER"})
  }
}

exports.leaveGroup = async (req, res) => {
  const groupId = req.params.groupId;
  const token = req.headers.authorization;

  if (token) {
    const decoded = jwt.decode(token, config.secret);

    try {
      console.log(decoded, groupId);
      const group = await Group.findByIdAsync(groupId);
      if (!group) res.send('No Group Found');

      const user = await User.findByIdAsync(decoded.sub);
      if (!user) res.send('No User Found');

      const groupIndex = group.memberList.indexOf(decoded.sub);
      const userIndex = user.groups.indexOf(groupId);
      group.memberList.splice(groupIndex, 1);
      user.groups.splice(userIndex, 1);

      user.save()
      group.save();
      return res.send(group);
    } catch (err) {
      return res.send(end);
    }
  }
  return res.send('Operation Failed');
}
