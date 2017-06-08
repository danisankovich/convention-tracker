var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config');
var bcrypt = require('bcrypt-nodejs');

const tokenForUser = (user) => {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = async function(req, res, next) {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({error: 'Email and Password Must Be Provided'});
  }
  try {
    const user = await User.findOneAsync({email});
    if (user) return res.status(422).send({error: 'Email Already In Use'});

    const newUser = new User({ email, password, username });

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(newUser.password, salt, null, function(err, hash) {
        if (err) return next(err);
        newUser.password = hash;
        newUser.save((err) => {
          if (err) return next(err);
          res.json({token: tokenForUser(newUser)});
        });
      });
    });
  } catch (e) {
    res.send(e);
  }

}

exports.signin = function(req, res, next) {
  res.send({token: tokenForUser(req.user)});
}

exports.getUser = async (req, res) => {
  const token = req.headers.authorization;
  let user;
  if(token) {
    try {
      const decoded = jwt.decode(token, config.secret);
      const user = await User.findByIdAsync(decoded.sub);
      if (!user) return res.send('No User')
      res.send(user);
    } catch (e) {
      return res.status(401).send('authorization required');
    }
  }
  else {
    res.send({user: "NO_USER"})
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAsync(req.params.id);
    if (!user) return res.send('no user');
  } catch (e) {
    res.send(e);
  }
}

exports.editInfo = async (req, res, next) => {
  const data = JSON.parse(req.body.data);
  const { phoneNumber: newPhone, email: newEmail } = data;

  try {
    const user = await User.findByIdAsync(data.user);

    if (!user) return res.send('No User');

    user.phoneNumber = newPhone || user.phoneNumber;
    user.email = newEmail || user.email;

    user.save();
    res.send(user);
  } catch (e) {
    res.send(e);
  }
}

exports.addFollower = (req, res) => {
  var token = req.headers.authorization;
  if(token) {
    try {
      var decoded = jwt.decode(token, config.secret);
      User.findByIdAndUpdate(
        decoded.sub, {$addToSet: {"following": req.body.user}}, {safe: true, upsert: true},
        function(err, user) {
          if (err) res.send(err);
          res.send(user);
        }
      )
     }
     catch (e) {
       return res.status(401).send('authorization required');
     }
  }
  else {
    res.send({user: "NO_USER"})
  }
}
exports.removeFollower = (req, res) => {
  var token = req.headers.authorization;
  if(token) {
    try {
      var decoded = jwt.decode(token, config.secret);
      User.findByIdAndUpdate(
        decoded.sub, {$pull: {"following": req.body.user}}, { multi: true },
        function(err, user) {
          if (err) res.send(err);
          res.send(user);
        }
      )
     }
     catch (e) {
       return res.status(401).send('authorization required');
     }
  }
  else {
    res.send({user: "NO_USER"})
  }
}
