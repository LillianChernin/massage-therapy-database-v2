const express = require('express');
const router = express.Router();
const techniquesController = require('../controllers/techniques');

router.get('/', techniquesController.index);
router.get('/:id', techniquesController.show);

module.exports = router;
