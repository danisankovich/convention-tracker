var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conventionSchema = new Schema({
  name: {type: String, lowercase: true, required: true},
  location: {type: String, lowercase: true},
  startdate: {type: String, default: false},
  enddate: {type: String, default: false},
  tags: {type: Array, default: []},
  image: String,
  photos: [],
  description: String,
  notes: String,
  user: String,
  username: String,
  email: String,
  creator: {},
  price: String
});

var CONVENTION = mongoose.model('convention', conventionSchema);
module.exports = CONVENTION;
