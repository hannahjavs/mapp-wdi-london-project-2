const rp = require('request-promise');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function facebook(req, res, next) {
  rp({
    method: 'POST',
    url: 'https://graph.facebook.com/v2.10/oauth/access_token',
    qs: {
      client_id: process.env.FACEBOOK_CLIENT_ID,
      client_secret: process.env.FACEBOOK_CLIENT_SECRET,
      code: req.body.code,
      redirect_uri: req.body.redirectUri
    },
    json: true
  })
    .then(token => {
      return rp({
        method: 'GET',
        url: 'https://graph.facebook.com/v2.5/me?fields=id,email,name,picture.type(large)',
        qs: token,
        json: true
      });
    })
    .then(profile => {
      return User.findOne({

        $or: [{ facebookId: profile.id }, { email: profile.email }]

      })
        .then(user => {
          if(!user) {
            user = new User({
              username: profile.name,
              facebookId: profile.id,
              image: profile.picture.data.url,
              email: profile.email
            });
          }
          user.image = profile.picture.data.url;
          user.facebookId = profile.id;
          return user.save();
        });
    })
    .then(user => {
      const payload = { userId: user.id };
      const token = jwt.sign(payload, secret, { expiresIn: '1hr' });
      res.json({ token, message: `Welcome ${user.username}`});
    })
    .catch(next);

}

module.exports = {
  facebook
};
