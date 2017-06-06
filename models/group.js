var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
  name: {type: String, lowercase: true, required: true},
  shareId: {type: String, lowercase: true, required: true},
  creatorId: {type: String, required: true},
  memberList: Array,
});

var Group = mongoose.model('group', groupSchema);
module.exports = Group;
