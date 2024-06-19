const mongoose = require('mongoose');

const stonesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name should be at least 2 characters'],
        // minLength: 2
    },
    category: {
        type: String,
        required: [true, 'Category should be at least 3 characters'],
        minLength: 3
    },
    color: {
        type: String,
        required: [true, 'Color should be at least 2 characters'],
        minLength: 2
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        match: /^https?:\/\//
    },
    location: {
        type: String,
        required: [true, 'Location should be between 5 and 15 characters'],
        minLength: 5,
        maxLength: 15
    },
    formula: {
        type: String,
        required: [true, 'Formula should be between 3 and 30 characters'],
        minLength: 3,
        maxLength: 30
    },
    description: {
        type: String,
        required: [true, 'Description should be a minimum of 10 characters long'],
        minLength: 10
    },
    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

const Stones = mongoose.model('Stones', stonesSchema);

module.exports = Stones;