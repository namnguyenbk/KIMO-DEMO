import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  statusID: { type: 'String', required: true },
  statusName: { type: 'String', required: true },
});
module.exports = mongoose.model('Status', statusSchema);
