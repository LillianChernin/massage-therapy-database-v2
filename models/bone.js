const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boneSchema = new Schema ({
  name: String,
  image: String
})

const Bone = mongoose.model('Bone', boneSchema);

module.exports = Bone;
module.exports.Schema = boneSchema;
