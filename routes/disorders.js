const express = require('express');
const router = express.Router();
const disordersController = require('../controllers/disorders');

router.get('/', disordersController.index);
router.get('/:id', disordersController.show);
router.get('/:id/techniques', disordersController.techniquesByDisorder);
router.get('/:id/techniques/:technique_id', disordersController.singleTechniqueByDisorder);

module.exports = router;
