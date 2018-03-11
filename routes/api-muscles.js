const express = require('express');
const router = express.Router();
const apiMusclesController = require('../controllers/api-muscles');

router.get('/', apiMusclesController.index);
router.get('/:id', apiMusclesController.show);

module.exports = router;
