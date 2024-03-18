const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new Schema({
  _id: { type: objectId, auto: true },
  project_id : {type: objectId , require: true, ref: 'projects'},
  account_id: { type: objectId, ref: 'accounts' },
  leader_id: { type: objectId, ref: 'accounts' },
  dead_line: { type: Date, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String , require: true , enum: ["Processing","Wait to Confirmed" , "Complete"], default : "Processing"}
}, {
  versionKey: false,  
  timestamps: true
});
const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;
