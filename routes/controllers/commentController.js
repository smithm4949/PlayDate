const Comment = require('../../models/Comment');

exports.getAll = function (req, res) {
  return Comment
  .findAll()
  .then(comments => res.status(200).json(comments))
  .catch(err => res.status(400).json(err))
}

exports.getOne = function (req, res) {
  return Comment
  .findOne({
    where: { id: req.params.id }
  })
  .then(comments => res.status(200).json(comments))
  .catch(err => res.status(400).json(err))
}

exports.create = function (req, res) {
  let data = { ...req.body };
  data.owner_id = req.session.user_id;
  data.event_id = req.session.event_id;
  return Comment
  .create(data)
  .then((comment) => {
    res.status(200).json(comment)
  })
  .catch(err => res.status(400).json(err))
}

exports.update = function (req, res) {
  return Comment
  .update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((comment) => {
    res.status(200).json(comment);
  })
  .catch(err => res.status(400).json(err));
}

exports.delete = function (req, res) {
  return Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((data) => {
    res.status(200).json(data);
  })
  .catch(err => res.status(400).json(err));
}