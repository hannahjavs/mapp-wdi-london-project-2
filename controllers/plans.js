const Plan = require('../models/plan');

function indexRoute(req, res, next) {
  Plan
    .find()
    .exec()
    .then((plans) => res.json(plans))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.createdBy = req.currentUser;
  console.log('req body', req.body);
  Plan
    .create(req.body)
    .then((plan) => res.status(201).json(plan))
    .catch(next);
}

function showRoute(req, res, next) {
  Plan
    .findById(req.params.id)
    .populate('items.place createdBy')
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

function updateRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;

  Plan
    .findById(req.params.id)
    .exec()
    .then((plan) => {
      if(!plan) return res.notFound();

      plan = Object.assign(plan, req.body);
      return plan.save();
    })
    .then((plan) => res.json(plan))
    .catch(next);
}

function addGuestRoute(req, res, next) {
  Plan
    .findById(req.params.id)
    .exec()
    .then((plan) => {
      if(!plan) return res.notFound();

      const guest = plan.guests.create(req.body);
      plan.guests.push(guest);
      return plan.save();
    })
    .then((plan) => res.json(plan))
    .catch(next);
}

// add deleteGuestRoute

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  delete: deleteRoute,
  update: updateRoute,
  addGuest: addGuestRoute
};
