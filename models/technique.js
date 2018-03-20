const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comments = require('./comment');

const techniqueSchema = new Schema ({
  shortDescription: String,
  detailedDescription: String,
  comments: [Comments.Schema],
  approved: {type: Boolean, default: false},
  rating: Number,
  authorId: String,
  authorUsername: String
})

const Technique = mongoose.model('Technique', techniqueSchema);

module.exports = Technique;
module.exports.Schema = techniqueSchema;
