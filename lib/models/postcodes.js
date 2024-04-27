const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pc: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    suburb: {
        type: String,
        required: true
    },
    conference: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    tourism_region: {
        type: String,
        required: true
    },
    __v: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Location = mongoose.model('postcodes', locationSchema);

module.exports = Location;