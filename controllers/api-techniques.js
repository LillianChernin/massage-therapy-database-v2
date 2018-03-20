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
  console.log(newComment);
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

const deleteComment = (req, res) => {
  console.log(req.params.comment_id);
  db.Comments.remove({_id: req.params.comment_id}, (err, technique) => {
    if (err) {
      console.log('error removing comment from comment db');
    }
  })
  db.Technique.findOneAndUpdate({ _id: req.params.id },
    { $pull: { comments: { _id: req.params.comment_id}}},
    (err, model) => {
      if (err) {
        res.status(500).send(err);
      }
      console.log(model);
      res.status(200).send(model);
    }
  )
}

module.exports.index = index;
module.exports.show = show;
module.exports.showComments = showComments;
module.exports.postCommentToTechnique = postCommentToTechnique;
module.exports.deleteComment = deleteComment;
