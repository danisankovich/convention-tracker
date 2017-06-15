'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var groupSchema = new Schema({
  name: { type: String, lowercase: true, required: true },
  shareId: { type: String, lowercase: true, required: true },
  creatorId: { type: String, required: true },
  creatorName: { type: String, required: true },
  affiliation: { type: String },
  notes: { type: String },
  memberList: Array,
  invitedList: Array
});

var Group = _mongoose2.default.model('group', groupSchema);
module.exports = Group;