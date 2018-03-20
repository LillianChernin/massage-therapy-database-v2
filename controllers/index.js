const db = require('../models');

const index = (req, res) => {
  res.render('index', {
    documentTitle: "MT Database",
    user: req.session.user
  })
}

module.exports.index = index;
