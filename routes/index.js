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
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

router.use('/api/v1/users', users);
router.use('/api/v1/disorders', apiDisorders);
router.use('/api/v1/muscles', apiMuscles);
router.use('/api/v1/techniques', apiTechniques);
router.use('/techniques', techniques);
router.use('/kinesiology-anatomy', kinesiologyAnatomy);
router.use('/disorders', disorders);
router.post('/login', authController.login);
router.get('/signup', authController.signup);
router.post('/signup', authController.createNewUser);
router.get('/logout', authController.logout);
router.get('/profile', userController.showProfile);
router.get('/', indexController.index);


module.exports = router;
