const db = require('../models');

const index = (req, res) => {
  res.render('index', {
    documentTitle: "MT Database"
  })
}
