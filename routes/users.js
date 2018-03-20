var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // db.User.find({}, (err, users) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   res.json(users);
  // })
  res.json({users: [{name: 'Timmy'}]});
});

module.exports = router;
