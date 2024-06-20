const mongoose = require('mongoose');

const volcanoShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    lastEruption: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    typeVolcano: {
        type: String,
        enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
        required: true
    },
    description: {
        type: String,
        required: true
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