const rp = require('request-promise');

function weatherProxy(req, res) {
  // Create a new request promise
  rp({
    url: `https://api.darksky.net/forecast/${process.env.DARK_SKIES_API_KEY}/51.5057,-0.12608?units=si`,
    method: 'GET',
    json: true
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

module.exports = {
  proxy: weatherProxy
};


/// weather url needs /time on end. /time should be the date selected when the plan is created
