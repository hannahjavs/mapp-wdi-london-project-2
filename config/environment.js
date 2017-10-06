const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/itineraryApp';
const secret = process.env.SECRET || 'shh';
const url = env === 'development' ? 'http://localhost:7000' : 'https://mapp-ga@herokuapp.com';

module.exports = { port, env, dbURI, secret, url };
