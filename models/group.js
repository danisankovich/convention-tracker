var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
  name: {type: String, lowercase: true, required: true},
  shareId: {type: String, lowercase: true, required: true},
  creatorId: {type: String, required: true},
  participant_list: Array,
});

var Group = mongoose.model('convention', Group);
module.exports = Group;
