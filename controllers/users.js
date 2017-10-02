const User = require('../models/user');

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next) {

  // this is for uploading an image
  if(req.file) req.body.image = req.file.filename;

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      user = Object.assign(user, req.body);
      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

module.exports = {
  show: showRoute,
  update: updateRoute
};
