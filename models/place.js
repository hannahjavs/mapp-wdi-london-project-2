const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
});

const placeSchema = new mongoose.Schema({
  googlePlaceId: { type: String, required: true },
  name: { type: String },
  address: { type: String },
  location: {
    lat: Number,
    lng: Number
  },
  reviews: [ reviewSchema ]
});

module.exports = mongoose.model('Place', placeSchema);
