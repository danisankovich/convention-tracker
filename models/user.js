var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  email: {type: String, lowercase: true, required: true},
  username: {type: String, lowercase: true, require: true},
  password: String,
  phoneNumber: String,
  aboutMe: String,
  myConventions: {type: Array, default: []},
  avatar: String,
  savedConventions: Array,
  reviewsOfMe: Array,
  myReviews: Array,
  followers: Array,
  following: {type: Array},
  confirmedStays: [],
  messagesChainIds: [],
  newMessages: Boolean,
  aboutMe: String
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  var pwd = this.password
  bcrypt.compare(candidatePassword, pwd, function(err, isMatch) {
    console.log(candidatePassword == pwd, isMatch)
    if (err) {return cb(err); }
    cb(null, isMatch);
  });
}
var USER = mongoose.model('user', userSchema);
module.exports = USER;
