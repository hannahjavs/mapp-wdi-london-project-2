const rp = require('request-promise');

function weatherProxy(req, res) {
  console.log(req.query);
  // Create a new request promise
  rp({
    url: `https://api.darksky.net/forecast/${process.env.DARK_SKIES_API_KEY}/${req.query.lat},${req.query.lng}?units=si&time=${req.query.time}`, // /time (the time selected on plan creation)
    method: 'GET',
    json: true
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

module.exports = {
  proxy: weatherProxy
};
