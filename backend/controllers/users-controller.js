const HttpError = require('../models/http-error');
const uuid = require('uuid');
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Mark Drinkwater',
        email: 'mdrinkwater@gmail.com',
        password: '123'
    },
    {
        id: 'u2',
        name: 'Austin Jones',
        email: 'aj@yahoo.com',
        password: '123'
    }
];

const getUsers = (req, res, next) => {
    if (DUMMY_USERS.length === 0) {
        throw new HttpError('List of users is empty');
    } else {
        return res.status(200).json({DUMMY_USERS});
    }
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422)
    }

    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError('Could not create user, email already exists.', 422);
    }

    const createdUser = {
        id: uuid.v4(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser);

    return res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email && u.password === password)

    if (!identifiedUser) {
        throw new HttpError('Login details incorrect.', 401);
    }

    return res.status(200).json({message: 'Login successful'});
};

module.exports.getUsers = getUsers;
module.exports.signup = signup;
module.exports.login = login;