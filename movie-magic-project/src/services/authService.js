const bcrypt = require('bcrypt');
const { User } = require('../models/User');

async function register(email, password) {

    const existing = await User.findOne({ email });

    if (existing) {
        const err = new Error('Email is already used!');
        err.errors = { email: 'Email is already used!' };

        throw err;
    }

    const user = new User({
        email,
        password: await bcrypt.hash(password, 10)
    })

    console.log('New user is registered:', email);

    await user.save();
    return user;
}

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
        console.log('Incorect password for user', email);

        throw new Error('Incorect email or password')
    }

    console.log(`Logged in as ${user.email}`);

    return user;
}

async function getUserData(email) {
    return await User.findOne({ email });
}

module.exports = {
    register,
    login,
    getUserData
}