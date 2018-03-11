const db = require('../models');

const index = (req, res) => {
  db.Disorder.find((err, disorders) => {
    res.json(disorders);
  });
}

const show = (req, res) => {
  db.Disorder.findById(req.params.id, (err, disorder) => {
    res.json(disorder);
  });
}

const showTechniques = (req, res) => {
  db.Disorder.findById(req.params.id, (err, disorder) => {
    res.json(disorder.techniques);
  });
}

const showTechniqueById = (req, res) => {
  db.Technique.findById(req.params.technique_id, (err, technique) => {
    res.json(technique);
  });
}

const showTechniqueComments = (req, res) => {
  db.Technique.findById(req.params.technique_id, (err, technique) => {
    res.json(technique.comments);
  });
}

const addTechnique = (req, res) => {
  let jsonResponse = [];
  let newTechnique = new db.Technique(req.body);
  newTechnique.save();
  db.Disorder.findByIdAndUpdate(req.params.id,
    {$push: {techniques: newTechnique}},
    {safe: true, upsert: true, new: true}, (err, disorder) => {
    if (err) {
      res.status(500).send(err);
    }
    jsonResponse.push(disorder);
    jsonResponse.push(newTechnique);
    res.status(200).send(jsonResponse);
  });
}

const updateTechnique = (req, res) => {
  db.Technique.findOne({_id: req.params.technique_id}, (err, technique) => {
    technique.shortDescription = req.body.shortDescription;
    technique.detailedDescription = req.body.detailedDescription;
    technique.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  })
  db.Disorder.findOne({_id: req.params.disorder_id}, (err, foundDisorder) => {
    let foundTechnique = foundDisorder.techniques.id(req.params.technique_id);
    foundTechnique.shortDescription = req.body.shortDescription;
    foundTechnique.detailedDescription = req.body.detailedDescription;
    foundDisorder.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(foundTechnique);
    })
  })
}

const deleteTechnique = (req, res) => {
  db.Technique.remove( {_id: req.params.technique_id}, (err, technique) => {
    if (err) {
      console.log('error removing technique from technique db');
    }
  })
  db.Disorder.findOneAndUpdate({ _id: req.params.disorder_id },
    { $pull: { techniques: { _id: req.params.technique_id}}},
    (err, model) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(model);
    }
  )
}

module.exports.index = index;
module.exports.show = show;
module.exports.showTechniques = showTechniques;
module.exports.showTechniqueById = showTechniqueById;
module.exports.showTechniqueComments = showTechniqueComments;
module.exports.addTechnique = addTechnique;
module.exports.updateTechnique = updateTechnique;
module.exports.deleteTechnique = deleteTechnique;
