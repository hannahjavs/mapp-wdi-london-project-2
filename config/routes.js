const router = require('express').Router();
const auth = require('../controllers/auth');
const plans = require('../controllers/plans');
const items = require('../controllers/items');
const secureRoute = require('../lib/secureRoute.js');
const weather = require('../controllers/weather');
const imageUpload = require('../lib/imageUpload');

router.route('/plans')
  .all(secureRoute)
  .get(plans.index)
  .post(plans.create)
  .post(imageUpload, plans.create); // User image upload

router.route('/plans/:id')
  .all(secureRoute)
  .get(plans.show)
  .delete(plans.delete)
  .put(imageUpload, plans.update); // User editing image

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

router.get('/weather', weather.proxy);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
