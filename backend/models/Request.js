const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  bookingType: {
    type: String,
    enum: ['Hourly', 'Number of meals', 'Number of days'],
    default: 'Hourly',
    required: true
  },
  bookingQuantity: {
    type: Int16Array,
    required: true
  },
  foodType: {
    type: String,
    enum: ['Veg', 'Non-Veg', 'Jain'],
    required: true
  },
  cuisine: String,
  priceLow: {
    type: Int32Array,
    required: true
  },
  priceMax: {
    type: Int32Array,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  authyId: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  acceptedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
  acceptedAt: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('Request', RequestSchema);
