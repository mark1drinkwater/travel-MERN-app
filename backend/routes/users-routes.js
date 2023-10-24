const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const usersControllers = require('../controllers/users-controller');

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

router.get('/', usersControllers.getUsers);

router.post(
    '/signup', 
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 8 })
    ],
    usersControllers.signup);

router.post('/login', usersControllers.login);

module.exports = router;