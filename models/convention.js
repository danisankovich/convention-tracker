var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conventionSchema = new Schema({
  name: {type: String, lowercase: true, required: true, unique: true},
  location: {type: String, lowercase: true, require: true },
  start_date: {type: String, default: false},
  end_date: {type: String, default: false},
  tags: {type: Array, default: []}
});

var CONVENTION = mongoose.model('convention', conventionSchema);
module.exports = CONVENTION;
