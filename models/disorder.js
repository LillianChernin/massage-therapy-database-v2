const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Technique = require('./technique');

const disorderSchema = new Schema ({
  name: String,
  description: String,
  cautions: String,
  techniques: [Technique.Schema],
  category: String
});

const Disorder = mongoose.model('Disorder', disorderSchema);

module.exports = Disorder;
