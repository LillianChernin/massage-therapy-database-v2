const db = require('../models');

const index = (req, res) => {
  db.Technique.find((err, techniques) => {
    res.json(techniques);
  });
}

const show = (req, res) => {
  db.Technique.findById(req.params.id, (err, technique) => {
    res.json(technique);
  });
}

const showComments = (req, res) => {
  db.Technique.findById(req.params.id, (err, technique) => {
    res.json(technique.comments);
  })
}

const postCommentToTechnique = (req, res) => {
  let newComment = new db.Comments(req.body);
  newComment.save();
  db.Technique.findByIdAndUpdate(req.params.id,
    {$push: {comments: newComment}},
    {safe: true, upsert: true, new: true}, (err, technique) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(newComment);
  });
}

module.exports.index = index;
module.exports.show = show;
module.exports.showComments = showComments;
module.exports.postCommentToTechnique = postCommentToTechnique;
