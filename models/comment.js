const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema ({
  userName: String,
  comment: String,
  date: String
})

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
module.exports.Schema = commentsSchema;
