const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.ObjectId, ref: 'Place', required: true },
  time: Date
});

const guestSchema = new mongoose.Schema({
  name: String,
  email: String,
  invited: { type: Boolean, default: false }
});

const planSchema =  new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  items: [ itemSchema ],
  guests: [ guestSchema ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
});



module.exports = mongoose.model('Plan', planSchema);
