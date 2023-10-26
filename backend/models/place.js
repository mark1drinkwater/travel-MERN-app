const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    image: { 
        type: String,
        required: true
    },
    address: { 
        type: String,
        required: true
    },
    location: { 
        latitude: { type: Number, required: true },
        longitude: { type:Number, required: true }
    },
    creator: { 
        type: mongoose.Types.ObjectId, // Tells mongo it is a real id.
        required: true,
        ref: 'User' // Establish the reference to the User schema
    }
});

module.exports = mongoose.model('Place', placeSchema); 