const router = require('express').Router();
const auth = require('../controllers/auth');
const plans = require('../controllers/plans');
const items = require('../controllers/items');

router.route('/plans')
  .get(plans.index)
  .post(plans.create);

router.route('/plans/:id')
  .get(plans.show)
  .delete(plans.delete);

router.route('/plans/:id/items')
  .post(items.create);

router.route('/plans/:id/items/:itemId')
  .delete(items.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
