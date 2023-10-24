const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.7484405,
            long: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://media.timeout.com/images/101705309/750/422/image.jpg',
        address: '20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.7484405,
            long: -73.9882393
        },
        creator: 'u1'
    }
];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => p.id === placeId);

    if (!place) {
        const error = new Error('Could not find a place for the provided id.');
        error.code = 404;
        throw error;
    } 

    res.json({place});
};

const getPlacesByUserId =  (req, res, next) => {
    const userId = req.params.uid;

    // Doh! .filter not find
    const places = DUMMY_PLACES.filter(u => {
        return u.creator === userId
    })


    // If the code is synchronous you can either use next or throw an error.
    // If the code is asyonchronous (like waiting for a database) then you must use next.
    if (!places || places.length === 0) {
        return next(
            new HttpError('Could not find places for the provided user.', 404)
        );        
    }

    res.json({places});
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

    const createdPlace = { 
        id: uuid.v4(),
        title,
        description,
        location: coordinates,
        address,
        creator
     };

     DUMMY_PLACES.push(createdPlace); // or unshift

     // 201 -- The creation of new data was a success
     res.status(201).json(createdPlace);
};

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const { title, description } = req.body;
    const placeId = req.params.pid; 
    
    // Create a copy using the ... operator, since objects are referencing,
    // If we changed it we'd be directly mutating the original object.
    const updatePlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatePlace.title = title;
    updatePlace.description = description;

    DUMMY_PLACES[placeIndex] = updatePlace;

    if (updatePlace) {
        return res.status(200).json({place: updatePlace});
    }

    return next(
        new HttpError('Could not update place.', 500)
    );
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid; 

    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('Could not find a place to delete for that id.', 404);
    }
    
    // DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    // Another way to do it, but then the array must not be a constant.
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    DUMMY_PLACES.splice(placeIndex); // Splice mutates the original array

    return res.status(200).json({message: 'Deleted place.'});   
}

// Alternative export syntax to export multiple functions.
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;