'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var conventionSchema = new Schema({
  name: { type: String, lowercase: true, required: true },
  location: {
    locationName: { type: String, lowercase: true },
    address: { type: String, lowercase: true },
    city: { type: String, lowercase: true },
    state: { type: String, lowercase: true },
    country: { type: String, lowercase: true },
    zipcode: { type: String, lowercase: true }
  },
  startdate: { type: String, default: false },
  enddate: { type: String, default: false },
  tags: { type: Array, default: [] },
  description: String,
  notes: String,
  user: String,
  username: String,
  email: String,
  creator: {},
  price: String,
  attendees: []
});

var CONVENTION = _mongoose2.default.model('convention', conventionSchema);
module.exports = CONVENTION;