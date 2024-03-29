const mongoose = require("mongoose");


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
    bookingDate: {
      type: Date, 
      required: true
    },
    bookingTime: {
      type: String,
      required:true
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
      coordinates: {
        latitude: {
          type: Number
        },
        longitude: {
          type: Number
        }
      }
    },
    authyId: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
    
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Maharaj",
      
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
      enum: ['unaccepted', 'accepted', 'ongoing', 'completed'],
      required: true,
      default: 'unaccepted',
    },
    modified: {
      type: Boolean, 
      default: false
    }
  });
  
module.exports = mongoose.model("Request",RequestSchema);  