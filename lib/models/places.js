const mongoose = require('mongoose');

const sdaPlacesSchema = new mongoose.Schema({
  _id: {
    type: String,
    alias: 'uuid'
  },
  official_name: {
    type: String,
  },
  place_type: {
    type: String,
  },
  street_lat: {
    type: Number,
    required: true,
  },
  street_lng: {
    type: Number,
    required: true,
  },
  street_address_full: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  website_url: {
    type: String,
  },
  postcode: {
    type: String,
  },
  conference: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },  
  tourism_region: {
    type: String,
  },
});

const Places = mongoose.model('places', sdaPlacesSchema);

module.exports = Places;