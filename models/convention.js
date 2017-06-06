var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conventionSchema = new Schema({
  name: {type: String, lowercase: true, required: true},
  location: {
    locationName: {type: String, lowercase: true},
    address: {type: String, lowercase: true},
    city: {type: String, lowercase: true},
    state: {type: String, lowercase: true},
    country: {type: String, lowercase: true},
    zipcode: {type: String, lowercase: true},
  },
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
  price: String,
  attendees: []
});

var CONVENTION = mongoose.model('convention', conventionSchema);
module.exports = CONVENTION;
