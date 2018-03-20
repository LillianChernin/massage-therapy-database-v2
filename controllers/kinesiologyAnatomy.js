const db = require('../models');

const index = (req, res) => {
  res.render('./kinesiology-anatomy/index', {
    documentTitle: "Kinesiology and Anatomy",
    user: req.session.user
  });
}

const bonesIndex = (req, res) => {
  db.Bone.find((err, bones) => {
    if (err) {
      res.status(500).send(err);
    }
  })
  res.render('./kinesiology-anatomy/bones', {
    documentTitle: "Bones",
    data: bones,
    user: req.session.user
  })
}

const musclesIndex = (req, res) => {
  db.Muscle.find((err, muscles) => {
    if (err) {
      res.status(500).send(err);
    }
    res.render('./kinesiology-anatomy/muscles', {
      documentTitle: "Muscles",
      data: muscles,
      user: req.session.user
    })
  })
}

module.exports.index = index;
module.exports.bonesIndex = bonesIndex;
module.exports.musclesIndex = musclesIndex;
