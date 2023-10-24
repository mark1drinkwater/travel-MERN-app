const HttpError = require("../models/http-error");
const axios = require('axios');

const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA';

async function getCoordsForAddress(address) {
    const params = {
        access_key: 'c766bcb8aff88dd3538e218c48f1d938',
        query: address
    }
      
    let coordinates = {};

    const response = await axios.get('http://api.positionstack.com/v1/forward', {params})

    const data = response.data.data;
    const place = data[0];

    if (!data) {
        const error = new HttpError('Could not find location for the specified address.', 422);
        throw error;
    }

    coordinates = { 
        latitude: place.latitude,
        longitude: place.longitude
    };

    return coordinates;
}

module.exports = getCoordsForAddress;