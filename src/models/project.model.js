const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new Schema({
  _id: { type: objectId, auto: true },
  name: { type: String, required: true },
  expense: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  sub_description: { type: String, required: true },
  leader: {type: objectId, ref:'accounts',default:null} ,
  members: [{ type: objectId, ref: 'accounts' }],
  total_task: { type: Number, default: null},
  status: { type: String , required: true , enum: ["Unconfirmed" ,"Confirmed", "Processing" , "Complete"], default : "Unconfirmed"},
  start_time: {type: Date , required: true},
  end_time: {type: Date , required: true}
}, {
  versionKey: false,  
  timestamps: true
});

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;
