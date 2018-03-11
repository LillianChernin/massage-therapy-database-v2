const express = require('express');
const router = express.Router();
const apiTechniquesController = require('../controllers/api-techniques');

router.get('/', apiTechniquesController.index);
router.get('/:id', apiTechniquesController.show);
router.get('/:id/comments', apiTechniquesController.showComments);
router.post('/:id', apiTechniquesController.postCommentToTechnique);

module.exports = router;
