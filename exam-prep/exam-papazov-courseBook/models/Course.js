const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // required: [true, 'The Title should be at least 5 characters'],
        // minLength: 5
    },
    type: {
        type: String,
        required: true,
        // required: [true, 'The Type should be a minimum of 3 characters long'],
        // minLength: 3
    },
    certificate: {
        type: String,
        required: true,
        // required: [true, 'The Certificate should be a minimum of 2 characters long'],
        // minLength: 2
    },
    image: {
        type: String,
        required: true,
        // required: [true, 'The Course Image should start with http:// or https://'],
        match: /^https?:\/\/.+/,
    },
    description: {
        type: String,
        required: true,
        // required: [true, 'The Description should be a minimum of 10 characters long'],
        // minLength: 10
    },
    price: {
        type: Number,
        required: true,
        // required: [true, 'The Price should be a positive number'],
        // default: 0,
        // min: 0
    },
    signUpList: [{
        type: [mongoose.Types.ObjectId],
        ref: 'User'
    }],
    owner: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
    },
});


const Course = mongoose.model('Course', courseSchema);


module.exports = Course;
