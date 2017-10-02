const Plan = require('../models/plan');

function indexRoute(req, res, next) {
  Plan
    .find()
    .exec()
    .then((plans) => res.json(plans))
    .catch(next);
}

function createRoute(req, res, next) {

  // this is for uploading an image
  if(req.file) req.body.image = req.file.filename;

  Plan
    .create(req.body)
    .then((plan) => res.status(201).json(plan))
    .catch(next);
}

function showRoute(req, res, next) {
  Plan
    .findById(req.params.id)
    .exec()
    .then((plan) => {
      if(!plan) return res.notFound();

      return res.json(plan);
    })
    .catch(next);
}

function deleteRoute(req, res, next) {
  Plan
    .findById(req.params.id)
    .exec()
    .then((plan) => {
      if(!plan) return res.notFound();

      return plan.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  delete: deleteRoute
};
