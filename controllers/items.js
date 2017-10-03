const Plan = require('../models/plan');
const Place = require('../models/place');

function createRoute(req, res, next) {

  Place
    .findOne({ googlePlaceId: req.body.googlePlaceId })
    .then(place => {
      if(!place) return Place.create(req.body);
      return place;
    })
    .then(place => {

      return Plan
        .findById(req.params.id)
        .exec()
        .then(plan => {
          const item = plan.items.create({ place: place.id });
          plan.items.push(item);

          // add item to the plan.items array and save it
          return plan.save();
        })
        .then((plan) => {
          // then populate the plan items places, and send the whole plan back as json
          Plan.populate(plan, { path: 'items.place' },(err, plan) => {
            return res.json(plan);
          });
        });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  console.log('inside updateRoute');
  Plan
    .findById(req.params.id)
    .exec()
    .then(plan => {
      if(!plan) return res.notFound();

      let item = plan.items.id(req.params.itemId);
      if(!item) return res.notFound();

      item = Object.assign(item, req.body);
      console.log('item to be saved', item);
      return plan.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function deleteRoute(req, res, next) {
  console.log('inside delete');
  Plan
    .findById(req.params.id)
    .exec()
    .then(plan => {
      if(!plan) return res.notFound();

      const item = plan.items.id(req.params.itemId);
      if(!item) return res.notFound();

      item.remove();
      return plan.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
