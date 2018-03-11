const db = require('../models');

const index = (req, res) => {
  db.Disorder.find((err, disorders) => {
    res.render('./disorders/index', {
      documentTitle: "Musculoskeletal Disorders",
      data: disorders
    });
  });
}

const show = (req, res) => {
  let currentId = req.params.id;
  db.Disorder.findById(currentId, (err, disorder) => {
    res.render('./disorders/individual-disorder', {
      documentTitle: disorder.name,
      data: disorder
    });
  });
}

const techniquesByDisorder = (req, res) => {
  let currentId = req.params.id;
  db.Disorder.findById(currentId, (err, disorder) => {
    res.render('./disorders/techniques-by-disorder-id', {
      documentTitle: disorder.name + ' - Techniques',
      data: disorder
    });
  });
}

const singleTechniqueByDisorder = (req, res) => {
  let disorderName;
  db.Disorder.findById(req.params.id, (err, disorder) => {
    disorderName = disorder.name;
  });
  db.Technique.findById(req.params.technique_id, (err, technique) => {
    res.render('./techniques/individual-technique', {
      documentTitle: disorderName + ' - ' + technique.shortDescription,
      data: technique,
      disorderId: req.params.id
    });
  });
}

module.exports.index = index;
module.exports.show = show;
module.exports.techniquesByDisorder = techniquesByDisorder;
module.exports.singleTechniqueByDisorder = singleTechniqueByDisorder;
