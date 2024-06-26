const Recipe = require('../models/Recipe');

exports.getAll = () => Recipe.find();

exports.getLatest = () => Recipe.find().sort({ createdAt: -1 }).limit(3);

exports.getOne = (recipeId) => Recipe.findById(recipeId).populate(['owner', 'recommendList']);

exports.create = (createdRecipe, userId) => {
    return Recipe.create({
        ...createdRecipe,
        owner: userId
    });
};

exports.edit = (recipeId, recipeData) => Recipe.findByIdAndUpdate(recipeId, recipeData, { runValidators: true });

exports.recommend = async (recipeId, userId) => await Recipe.findByIdAndUpdate(recipeId, { $push: { recommendList: userId } });

exports.delete = (recipeId) => Recipe.findByIdAndDelete(recipeId);

exports.search = async (title) => {
    let result = await this.getAll().lean();

    if (title) {
        result = result.filter(r => r.title.toLowerCase().includes(title.toLowerCase()));
    }

    return result;

};

