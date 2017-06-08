import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const conventionSchema = new Schema({
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
  description: String,
  notes: String,
  user: String,
  username: String,
  email: String,
  creator: {},
  price: String,
  attendees: []
});

const CONVENTION = mongoose.model('convention', conventionSchema);
module.exports = CONVENTION;
