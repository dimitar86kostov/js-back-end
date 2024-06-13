const { Schema, SchemaType: Types, model } = require('mongoose')

const movieSchema = new Schema({

    title: {
        type: String,
        required: true,
        minLength: [5, 'Title must be at least 5 characters long'],
        match: [/^[a-z0-9 ]+$/gi, 'Title may only contain English letters, number and spaces']
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
        maxLength: 1000,
        minLength: [20, 'Description must be at least 20 characters long'],
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

