const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
        required: [true, 'The Title should be at least 2 characters'],
        minLength: 2
    },
    author: {
        type: String,
        // required: true,
        required: [true, 'The Author should be at least 5 characters'],
        minLength: 5
    },
    genre: {
        type: String,
        // required: true,
        required: [true, 'The Genre should be at least 3 characters'],
        minLength: 2
    },
    stars: {
        type: Number,
        // required: true,
        required: [true, 'The Stars should be a positive number between 1 and 5'],
        min: 1,
        max: 5
    },
    image: {
        type: String,
        // required: true,
        required: [true, 'The Image should start with http:// or https://'],
        match: /^https?:\/\//
    },
    bookReview: {
        type: String,
        // required: true,
        required: [true, 'The Review should be a minimum of 10 characters long.'],
        minLength: 10
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;