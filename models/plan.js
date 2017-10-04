const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.ObjectId, ref: 'Place', required: true },
  time: Date
});

const planSchema =  new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  items: [ itemSchema ]
});

module.exports = mongoose.model('Plan', planSchema);
