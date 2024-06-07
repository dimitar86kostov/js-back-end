const mongoose = require('mongoose');
require('../models/movies');
require('../models/cast');
require('../models/User');

const connectionString = 'mongodb://127.0.0.1:27017/movie-magic';

async function databaseConfig() {
    await mongoose.connect(connectionString);

    console.log('DB is connected!');
    // mongoose.connection.on('error', (err) => console.error(err));
}

module.exports = { databaseConfig }