import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
  email: {type: String, lowercase: true, required: true},
  username: {type: String, lowercase: true, require: true},
  password: String,
  phoneNumber: String,
  groups: Array,
  invitedToGroups: Array,
  myConventions: {type: Array, default: []},
  photo: {type: String, default: 'http://s3.amazonaws.com/cdn.roosterteeth.com/default/original/user_profile_female.jpg'}
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  const pwd = this.password
  bcrypt.compare(candidatePassword, pwd, function(err, isMatch) {
    if (err) {return cb(err); }
    cb(null, isMatch);
  });
}
const USER = mongoose.model('user', userSchema);
module.exports = USER;
