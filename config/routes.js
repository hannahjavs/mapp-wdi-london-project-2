const router = require('express').Router();
const auth = require('../controllers/auth');
const plans = require('../controllers/plans');
const items = require('../controllers/items');
const secureRoute = require('../lib/secureRoute.js');

router.route('/plans')
  .all(secureRoute)
  .get(plans.index)
  .post(plans.create);

router.route('/plans/:id')
  .all(secureRoute)
  .get(plans.show)
  .delete(plans.delete);

router.route('/plans/:id/items')
  .all(secureRoute)
  .post(items.create);

router.route('/plans/:id/items/:itemId')
  .all(secureRoute)
  .delete(items.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
