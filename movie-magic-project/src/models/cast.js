const { Schema, model, Types } = require('mongoose');

const castSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    born: {
        type: String,
        required: true
    },
    nameInMovie: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        RegExp: /^https?:\/\/.+/
    },
    movie: {
        type: Types.ObjectId,
        ref: 'movies'
    }
})

const Cast = model('cast', castSchema);

module.exports = { Cast } 