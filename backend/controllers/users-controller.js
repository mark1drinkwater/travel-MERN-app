const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    // Excludes password field
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    }
    res.status(200).json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Signup failed, please try again later', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('User eists already, please login instead.', 422);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png',
        password,
        places: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        console.log(err.message);
        const error = new HttpError('Signing Up failed, please try again.', 500);
        return next(error);
    }

    return res.status(201).json({user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Login failed, please try again later', 500);
        return next(error);
    }

    console.log(existingUser);
    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Invalid credentials, could not log you in.', 401);
        return next(error);
    }

    return res.status(200).json({message: 'Login successful'});
};

module.exports.getUsers = getUsers;
module.exports.signup = signup;
module.exports.login = login;