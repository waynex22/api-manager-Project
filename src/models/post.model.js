const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const postSchema = new Schema({
  _id: { type: objectId, auto: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String , require: true , enum: ["Processing"  , "Complete"], default : "Processing"}
}, {
  versionKey: false,  
  timestamps: true
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;
