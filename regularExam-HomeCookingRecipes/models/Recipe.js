const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The Title should be at least 2 characters'],
        minLength: 2
    },
    ingredients: {
        type: String,
        required: [true, 'The Ingredients should be between 10 and 200 characters long'],
        minLength: 10,
        maxLength: 200
    },
    instructions: {
        type: String,
        required: [true, 'The Instuctions should be at least 10 characters long'],
        minLength: 10
    },
    description: {
        type: String,
        required: [true, 'The Description should be between 10 and 100 characters long'],
        minLength: 10,
        maxLength: 100
    },
    image: {
        type: String,
        required: [true, 'The Image should start with http:// or https://'],
        match: /^https?:\/\//  
    },
    recommendList: [{
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

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;