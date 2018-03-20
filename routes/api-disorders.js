const express = require('express');
const router = express.Router();
const apiDisordersController = require('../controllers/api-disorders');

router.get('/', apiDisordersController.index);
router.get('/:id', apiDisordersController.show);
router.get('/:id/techniques', apiDisordersController.showTechniques);
router.get('/:id/techniques/:technique_id', apiDisordersController.showTechniqueById);
router.get('/:id/techniques/:technique_id/comments', apiDisordersController.showTechniqueComments);
router.post('/:id/techniques', apiDisordersController.addTechnique);
router.put('/:id/update-description', apiDisordersController.updateDisorderDesc);
router.put('/:id/update-cautions', apiDisordersController.updateDisorderCautions);
router.put('/:disorder_id/techniques/:technique_id', apiDisordersController.updateTechnique);
router.delete('/:disorder_id/techniques/:technique_id', apiDisordersController.deleteTechnique);

module.exports = router;
