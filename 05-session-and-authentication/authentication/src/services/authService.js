const bcrypt = require('bcrypt');
const { User } = require('../models/User.js');

seed();
async function seed() {
    try {
        await register('dimi', '123')

    } catch (error) {
        console.log('Database already seeded!');
    }
}

async function register(username, password) {
    //check if the user already exist
    const existing = await User.findOne({ username });

    if (existing) {
        throw new Error("Username is taken!")
    }

    //creating new user from User model with crypted password
    const user = new User({
        username,
        hashedPassword: await bcrypt.hash(password, 10)
    });

    //adding new user to the 'users' db collection
    await user.save();

    console.log('Created new user', username);

    return user;
}

async function login(username, password) {
    const user = await User.findOne({ username });

    //validation with crypted pass
    if (!user || !await bcrypt.compare(password, user.hashedPassword)) {
        console.log('Incorect password for user', username);
        throw new Error("Incorect username or password!")
    }

    console.log('Logged in as', user.username);

    return user;
}

async function getUserData() {
    //returning the collection of users
    return await User.find();
}

module.exports = {
    register,
    login,
    getUserData
}