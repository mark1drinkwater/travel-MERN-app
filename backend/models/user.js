const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // This creates an index for email, which speeds up the querying process.
                    // Oddly this does not check if the email is unique.
                    // You need to use the mongoose-unique-validator package to accomplish this.

    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    image: {
        type: String,
        required: true
    },
    places: [ // Tells Mongo it is an array (more than 1 mplace)
        { 
            type: mongoose.Types.ObjectId, // Tells mongo it is a real id.
            required: true,
            ref: 'Place' // Establish the reference to the Place schema
        }
    ]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);