const db = require('../models');

const index = (req, res) => {
  db.Technique.find((err, techniques) => {
   res.render('./techniques/index', {
     documentTitle: "Massage Techniques",
     data: techniques,
     user: req.session.user
   });
 });
}

const show = (req, res) => {
  db.Technique.findById(req.params.id, (err, model) => {
    if (err) {
      res.status(500).send(err);
    }
    res.render('./techniques/individual-technique', {
      documentTitle: model.shortDescription,
      data: model,
      user: req.session.user
    });
  });
}

module.exports.index = index;
module.exports.show = show;
