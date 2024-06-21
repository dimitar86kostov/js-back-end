const mongoose = require('mongoose');

const volcanoShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        // required: [true, 'Name should be at least 2 characters long'],
        // minLength: 2
    },
    location: {
        type: String,
        required: [true, 'Location should be at least 3 characters'],
        minLength: 3
    },
    elevation: {
        type: Number,
        required: [true, 'Elevation should be minimum 0'],
        min: 0
    },
    lastEruption: {
        type: Number,
        required: [true, 'Year of Last Eruption should be between 0 and 2024'],
        min: 0,
        max: 2024
    },
    image: {
        type: String,
        required: [true, 'The Volcano Image should start with http:// or https://'],
        match: /^https?:\/\//
    },
    typeVolcano: {
        type: String,
        enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
        required: [true, 'The Type should be select between "Supervolcanoes", "Submarine", "Subglacial", "Mud", "Stratovolcanoes", "Shield"']
    },
    description: {
        type: String,
        required: [true, 'Description should be a minimum of 10 characters long'],
        minLength: 10
    },
    voteList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

const Volcano = mongoose.model('Volcano', volcanoShema);

module.exports = Volcano;