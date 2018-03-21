const db = require('../models');

const addTechniqueToFavorites = (req, res) => {
  let favorite = {};
  favorite.techniqueId = req.body.techniqueId;
  favorite.disorderId = req.body.disorderId;
  favorite.disorderName = req.body.disorderName;
  favorite.techniqueShortDescription = req.body.techniqueShortDescription;
  favorite.techniqueDetailedDescription = req.body.techniqueDetailedDescription;
  db.User.findByIdAndUpdate(req.params.id,
    {$push: {favoriteTechniques: favorite}},
    {safe: true, upsert: true, new: true}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    req.session.user = user;
    res.status(200).send(favorite);
  });
}

const removeTechniqueFromFavorites = (req, res) => {
  let updatedFavoriteTechniques = [];
  db.User.findById(req.params.id, (err, user) => {
    for (let i = 0; i < user.favoriteTechniques.length; i++) {
      if (user.favoriteTechniques[i].techniqueId !== req.body.techniqueId) {
        updatedFavoriteTechniques.push(user.favoriteTechniques[i]);
      }
    }
    user.favoriteTechniques = updatedFavoriteTechniques;
    user.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      req.session.user = user;
      res.status(200).send(updatedFavoriteTechniques);
    });
  });
}

module.exports.addTechniqueToFavorites = addTechniqueToFavorites;
module.exports.removeTechniqueFromFavorites = removeTechniqueFromFavorites;
