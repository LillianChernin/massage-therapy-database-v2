const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const muscleSchema = new Schema ({
  name: String,
  origins: Array,
  insertions: Array,
  actions: Array,
  nerves: Array,
  image: String
});

const Muscle = mongoose.model('Muscle', muscleSchema);

module.exports = Muscle;
module.exports.Schema = muscleSchema;
