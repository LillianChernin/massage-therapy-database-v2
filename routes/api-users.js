const express = require('express');
const router = express.Router();
const apiUsersController = require('../controllers/api-users');

router.put('/:id/add-technique-to-favorites', apiUsersController.addTechniqueToFavorites);
router.put('/:id/remove-technique-from-favorites', apiUsersController.removeTechniqueFromFavorites);

module.exports = router;
