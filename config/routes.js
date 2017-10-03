const router = require('express').Router();
const auth = require('../controllers/auth');
const plans = require('../controllers/plans');
const items = require('../controllers/items');
// const places = require('../controllers/places');
const users = require('../controllers/users');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute.js');
const weather = require('../controllers/weather');
const imageUpload = require('../lib/imageUpload');

router.route('/plans')
  .all(secureRoute)
  .get(plans.index)
  .post(plans.create);

router.route('/plans/:id')
  .all(secureRoute)
  .get(plans.show)
  .delete(plans.delete);

router.route('/plan/:id/edit')
  .all(secureRoute)
  .put(plans.update);

router.route('/places')
  .all(secureRoute);

router.route('/plans/:id/items')
  .all(secureRoute)
  .post(items.create);

router.route('/plans/:id/items/:itemId')
  .all(secureRoute)
  .put(items.update)
  .delete(items.delete);

router.route('/users/:id')
  .all(secureRoute)
  .get(users.show)
  .put(imageUpload, users.update); // User updating image and uploading to users/show.html page

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.get('/weather', weather.proxy);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
