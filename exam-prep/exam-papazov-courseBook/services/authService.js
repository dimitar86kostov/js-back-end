const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config');

const User = require('../models/User');

exports.register = async (userData) => {
    if (userData.password != userData.repass) {
        throw new Error('Password missmatch');
    }

    const user = await User.findOne({ email: userData.email });
    if (user) {
        throw new Error('User already exist')
    }
    const createdUser = await User.create(userData);

    const token = generateToken(createdUser);

    return token;
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!email) {
        throw new Error('Email or Password is invalid')
    }
    if (!password) {
        throw new Error('Email or Password is invalid')
    }
    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Email or Password is invalid')
    }

    // Generate Token

    const token = await generateToken(user);

    console.log(`${email} logged in!`);
    return token;
};

function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }
    return jwt.sign(payload, SECRET, { expiresIn: '2h' });
}
