'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var userSchema = new Schema({
  email: { type: String, lowercase: true, required: true },
  username: { type: String, lowercase: true, require: true },
  password: String,
  phoneNumber: String,
  groups: Array,
  invitedToGroups: Array,
  myConventions: { type: Array, default: [] },
  photo: { type: String, default: '' }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  var pwd = this.password;
  _bcryptNodejs2.default.compare(candidatePassword, pwd, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
var USER = _mongoose2.default.model('user', userSchema);
module.exports = USER;