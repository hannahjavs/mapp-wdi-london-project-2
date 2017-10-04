const User = require('../models/user');

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('plansCreated')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      console.log(user);

      res.json(user);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;

  User
    .create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;

  console.log(req.body);

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
  create: createRoute,
  update: updateRoute
};
