const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

// const DUMMY_PLACES = [
//     {
//         id: 'p1',
//         title: 'Empire State Building',
//         description: 'One of the most famous sky scrapers in the world!',
//         imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
//         address: '20 W 34th St., New York, NY 10001',
//         location: {
//             lat: 40.7484405,
//             long: -73.9878584
//         },
//         creator: 'u1'
//     },
//     {
//         id: 'p2',
//         title: 'Emp. State Building',
//         description: 'One of the most famous sky scrapers in the world!',
//         imageUrl: 'https://media.timeout.com/images/101705309/750/422/image.jpg',
//         address: '20 W 34th St., New York, NY 10001',
//         location: {
//             lat: 40.7484405,
//             long: -73.9882393
//         },
//         creator: 'u1'
//     }
// ];

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        // This error is displayed if something goes wrong with the http for e.g.
        const error = new HttpError('Something went wrong, could not find a place.', 500);        
        return next(error);
    }

    // This error is displayed if a place by that id does not exist.
    if (!place) {
        const error = new Error('Could not find a place for the provided id.', 404);
        return next(error);
    } 

    // Convert model to normal JS object & add a id property without the _id
    res.json({place : place.toObject( {getters: true} ) });
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let places;
    try {
        places = await Place.find({ creator:userId });
    } catch (err) {
        // This error is displayed if something goes wrong with the http for e.g.
        const error = new HttpError('Fetching places failed, please try again later.', 500);        
        return next(error);
    }

    // This error is displayed if a place by that id does not exist.
    if (!places) {
        const error = new Error('Could not find a place for the provided id.', 404);
        return next(error);
    } 


    // The code is asyonchronous (like waiting for a database) then you must use next.
    if (!places || places.length === 0) {
        return next(
            new HttpError('Could not find places for the provided user.', 404)
        );        
    }

    console.log(places)
    res.json({places : places.map(place => place.toObject({getters: true})) });
};

const createPlace = async (req, res, next) => {
    // This will look into the request & return any errors, according to your validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    // shorthand for const title = req.body.title.. .
    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);     
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Italy_-_Pisa_-_Leaning_Tower.jpg',
        creator
    });

    try {
        await createdPlace.save()
    } catch (err) {
        const error = new HttpError(
            'Creating a place failed, please try again.',
            500
        );
        return next(error);
    }

     // 201 -- The creation of new data was a success
     res.status(201).json({createdPlace: createdPlace.toObject({ getters: true }) });
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid; 
    
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update place.', 500);
        return next(error);
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update place.', 500);
        return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid; 

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        console.log(err);
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
    }

    try {
        console.log(place)
        await place.remove();
    } catch (err) {
        console.log(err);
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
    }

    return res.status(200).json({message: 'Deleted place.'});   
}

// Alternative export syntax to export multiple functions.
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;