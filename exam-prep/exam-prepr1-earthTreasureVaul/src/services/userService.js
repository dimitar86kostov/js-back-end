const bcrypt = require('bcrypt');
const { User } = require('../models/User');

async function register(email, password, repass) {
    // check if user exists -> throw error if true
    // hash password
    // create DB record
    // return saved record

    const existing = await User.findOne({ email });

    if (existing) {
        const err = new Error('Email is already used');
        err.errors = { email: 'Email is already used' };
        throw err;
    }
    if (!email) {
        throw new Error('Email is required');
    }
    if (!password) {
        throw new Error('Password is required');
    }
    if (password != repass) {
        throw new Error('Password don\'t match');
    }

    const user = new User({
        email,
        password: await bcrypt.hash(password, 10)
    });

    await user.save();

    return user;
}

async function login(email, password) {
    // check if user exists -> throw error if false
    // compare hashed password -> throw error if false
    // return matched user

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    console.log(`${user.email} is logged in`);
    return user;
}

module.exports = {
    register,
    login
};