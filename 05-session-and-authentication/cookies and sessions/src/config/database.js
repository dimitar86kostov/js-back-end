const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/trip-project';

async function databaseConfig() {
    await mongoose.connect(connectionString);

    console.log('DB is connected!');
    // mongoose.connection.on('error', (err) => console.error(err));
}

module.exports = { databaseConfig }