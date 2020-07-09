const User = require('./User');
const geocoder = require('../utils/geocoder');
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  bookingType: {
    type: String,
    enum: ['Hourly', 'Number of meals', 'Number of days'],
    default: 'Hourly',
    required: true,
  },
  bookingQuantity: {
    type: Number,
    required: true,
  },
  foodType: {
    type: String,
    enum: ['Veg', 'Non-Veg', 'Jain'],
    required: true,
  },
  cuisine: String,
  priceLow: {
    type: Number,
    required: true,
  },
  priceMax: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  authyId: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  acceptedAt: {
    type: Date,
    default: null,
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    enum: ['unaccepted', 'ongoing', 'completed'],
    required: true,
    default: 'unaccepted',
  },
});

RequestSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    };
    
    next();
});

module.exports = mongoose.model('Request', RequestSchema);
