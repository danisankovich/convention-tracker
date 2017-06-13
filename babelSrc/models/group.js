import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {type: String, lowercase: true, required: true},
  shareId: {type: String, lowercase: true, required: true},
  creatorId: {type: String, required: true},
  creatorName: {type: String, required: true},
  affiliation: {type: String},
  notes: {type: String},
  memberList: Array,
  invitedList: Array,
});

const Group = mongoose.model('group', groupSchema);
module.exports = Group;
