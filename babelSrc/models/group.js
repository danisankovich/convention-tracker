import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {type: String, lowercase: true, required: true},
  shareId: {type: String, lowercase: true, required: true},
  creatorId: {type: String, required: true},
  memberList: Array,
});

const Group = mongoose.model('group', groupSchema);
module.exports = Group;
