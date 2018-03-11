const express = require('express');
const router = express.Router();
const users = require('./users');
const techniques = require('./techniques');
const kinesiologyAnatomy = require('./kinesiologyAnatomy');
const disorders = require('./disorders');
const apiDisorders = require('./api-disorders');
const apiMuscles = require('./api-muscles');
const apiTechniques = require('./api-techniques');
const indexController = require('../controllers/index');

router.use('/api/v1/users', users);
router.use('/api/v1/disorders', apiDisorders);
router.use('/api/v1/muscles', apiMuscles);
router.use('/api/v1/techniques', apiTechniques);
router.use('/techniques', techniques);
router.use('/kinesiology-anatomy', kinesiologyAnatomy);
router.use('/disorders', disorders);
router.get('/', indexController.index);


module.exports = router;
