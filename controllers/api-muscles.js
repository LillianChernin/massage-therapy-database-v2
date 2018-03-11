const db = require('../models');

const index = (req, res) => {
  db.Muscle.find((err, muscles) => {
    res.json(muscles);
  });
}

const show = (req, res) => {
  db.Muscle.findById(req.params.id, (err, muscle) => {
    res.json(muscle);
  });
}

module.exports.index = index;
module.exports.show = show;
