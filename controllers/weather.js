const rp = require('request-promise');

function weatherProxy(req, res) {
  // Create a new request promise
  rp({
    url: `https://api.darksky.net/forecast/${process.env.DARK_SKIES_API_KEY}/42.3601,-71.0589?units=si`,
    method: 'GET',
    json: true
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

module.exports = {
  proxy: weatherProxy
};
