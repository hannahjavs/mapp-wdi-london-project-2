const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');

mongoose.connect(dbURI, { useMongoClient: true });

User.collection.drop();

// Seeds here
User
  .create([{
    username: 'ajay',
    email: 'ajay.lard@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => console.log(`${users.length} users created!`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
