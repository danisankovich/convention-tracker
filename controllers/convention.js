var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');

var Convention = require('../models/convention');
var User = require('../models/user');
var randomKeyGen = require('../services/randomkeygen');
exports.findOneConvention = (req, res) => {
  Convention.findById(req.params.id, (err, convention) => {
    if (err) res.send(err);
    console.log(convention)
    res.send(convention);
  })
}

exports.findAllConventions = (req, res) => {
  Convention.find({}, (err, conventions) => {
    if (err) res.send(err);
    console.log(conventions)
    res.send(conventions)
  })
}

exports.findMyConventions = (req, res) => {
  const data = JSON.parse(req.body.data);
  Convention.find({'_id': { $in: data}}, (err, conventions) => {
    if (err) res.send(err);
    res.send(conventions);
  });
}

exports.editConvention = (req, res) => {
  var updatedConvention =JSON.parse(req.body.data).convention;
  var token = req.headers.authorization;

  var decoded = jwt.decode(token, config.secret);
  var userId;
  User.findById(decoded.sub, (err, user) => {
    userId = user._id
    Convention.findById(updatedConvention._id, (err, convention) => {
      if (err) {
        res.send(err)
      };
      if (convention.creator.id != userId) {
        res.send('You do not have these permissions');
      }
    })
  })

}

exports.newConvention = (req, res) => {
  var data = {
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
    }
  }

  Convention.create(data, (err, convention) => {
    console.log(err, '----', convention)
    if(err) return res.send(err);
    User.findById(data.userId, (err, user) => {
      console.log(convention, '111111');
      console.log(user, 'dssdsd')
      if (err || !user) return res.send(err);
      user.myConventions.push(convention._id)
      user.save();
      console.log(user)
      res.json(convention)
    });
  });
};

exports.deleteConvention = (req, res) => {
  var convention = req.params.id;
  var token = req.headers.authorization;
  var decoded = jwt.decode(token, config.secret);
  User.findById(decoded.sub, (err, user) => {
    if(err) res.send(err)
    var index = user.myConventions.indexOf(convention);
    Convention.findByIdAndRemove(convention, (err, conventionToRemove) => {
      if(err) {
        res.send(err)
      }
      if (index > -1) {
        user.myConventions.splice(index, 1);
        user.save(user)
        res.send(user);
      }
    })
  });
}
