const HttpError = require('../models/http-error');

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
        creator: 'u2'
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

const getPlaceByUserId =  (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(u => u.creator === userId)

    // If the code is synchronous you can either use next or throw an error.
    // If the code is asyonchronous (like waiting for a database) then you must use next.
    if (!place) {
        return next(
            new HttpError('Could not find places for the provided user.', 404)
        );        
    }

    res.json({place});
};

const createPlace = (req, res, next) => {
    
};

// Alternative export syntax to export multiple functions.
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;