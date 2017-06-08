import express from 'express';
const router = express.Router();
import expressJwt from 'express-jwt';
import config from '../config';
import jwt from 'jwt-simple';

import Convention from '../models/convention';
import User from '../models/user';

exports.findOneConvention = async (req, res) => {
  try {
    const convention = await Convention.findByIdAsync(req.params.id);
    res.send(convention)
  } catch (e) {
    res.send(e)
  }
}

exports.findAllConventions = async (req, res) => {
  try {
    const conventions = await Convention.findAsync({});
    res.send(conventions)
  } catch (e) {
    res.send(err)
  }
}

exports.findMyConventions = async (req, res) => {
  const data = JSON.parse(req.body.data);

  try {
    const conventions = await Convention.findAsync({'_id': { $in: data}});
    res.send(conventions)
  } catch (e) {
    res.send(err)
  }
}

exports.editConvention = async (req, res) => {
  const updatedConvention =JSON.parse(req.body.data).convention;
  const token = req.headers.authorization;

  const decoded = jwt.decode(token, config.secret);

  try {
    const user = await User.findByIdAsync(decoded.sub);
    const userId = user._id

    const convention = await Convention.findByIdAsync(updatedConvention._id)
    if (convention.creator.id != userId) {
      res.send('You do not have these permissions');
    } else {
      res.send(convention)
    }
  } catch (e) {
    res.send(e)
  }
}

exports.newConvention = async (req, res) => {
  const data = {
    name: req.body.name,
    location: {
      locationName: req.body.locationName,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      zipcode: req.body.zipcode,
      country: req.body.country,
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
  }
  try {
    const convention = await Convention.createAsync(data);
    if (!convention) return res.send('Error');

    const user = await User.findByIdAsync(data.userId);
    if (!user) return res.send('Error');

    user.myConventions.push(convention._id);
    user.save();

    res.json(convention);
  } catch (e) {
    res.send(e)
  }
};

exports.deleteConvention = async (req, res) => {
  const convention = req.params.id;
  const token = req.headers.authorization;
  const decoded = jwt.decode(token, config.secret);
  try {
    const user = await User.findByIdAsync(decoded.sub);
    if (!user) return res.send('No User');

    const index = user.myConventions.indexOf(convention);

    const conventionToRemove = await Convention.findByIdAndRemoveAsync(convention);
    if (!convention) return res.send('Can\'t find convention');

    if (index > -1) {
      user.myConventions.splice(index, 1);
      user.save(user)

      res.send(user);
    } else {
      res.send('Convention not Found')
    }
  } catch (e) {
    res.send(e);
  }
}
