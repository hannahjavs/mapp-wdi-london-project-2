const Plan = require('../models/plan');
const Place = require('../models/place');

function createRoute(req, res, next) {

  Place
    .findOne({ googlePlaceId: req.body.googlePlaceId })
    .then(place => {
      if(!place) return Place.create({ googlePlaceId: req.body.googlePlaceId });
      return place;
    })
    .then(place => {

      req.body.place = place;

      return Plan
        .findById(req.params.id)
        .exec()
        .then(plan => {
          const item = plan.items.create(req.body);
          plan.items.push(item);

          return plan.save()
            .then(() => res.status(201).json(item));
        });
    })
    .catch(next);
}

function deleteRoute(req, res, next) {
  Plan
    .findById(req.params.id)
    .exec()
    .then(plan => {
      if(!plan) return res.notFound();

      const item = plan.items.id(req.params.itemId);
      if(!item) return res.notFound();

      return item.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create: createRoute,
  delete: deleteRoute
};
