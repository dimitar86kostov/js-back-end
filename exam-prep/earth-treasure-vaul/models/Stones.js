const mongoose = require('mongoose');

const stonesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    color: {
        type: String,
        required: [true, 'color is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    location: {
        type: String,
        required: [true, 'location is required']
    },
    formula: {
        type: String,
        required: [true, 'formula is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
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