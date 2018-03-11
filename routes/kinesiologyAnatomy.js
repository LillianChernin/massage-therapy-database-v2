const express = require('express');
const router = express.Router();
const kinesiologyAnatomyController = require('../controllers/kinesiologyAnatomy');

router.get('/', kinesiologyAnatomyController.index);
router.get('/bones', kinesiologyAnatomyController.bonesIndex);
router.get('/muscles', kinesiologyAnatomyController.musclesIndex);

module.exports = router;
