const { Schema, SchemaType: Types, model } = require('mongoose')

const movieSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1878,
        max: 2100
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    imageURL: {
        type: String,
        required: true,
        match: /^https?:\/\/.+/
    },
    description: {
        type: String,
        maxLength: 1000
    },
    cast: {
        type: [Types.ObjectId],
        ref: 'cast',
        default: []
    },
    creatorId: {
        type: String,  //   type: Types.ObjectId
        required: true  //   ref: 'User'
    }
})

const Movie = model('movies', movieSchema);

module.exports = { Movie }

