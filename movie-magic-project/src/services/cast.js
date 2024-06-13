const { Cast } = require("../models/cast")

async function createCast(castData) {
    const cast = new Cast({
        name: castData.name.trim(),
        age: castData.age.trim(),
        born: castData.born.trim(),
        nameInMovie: castData.nameInMovie.trim(),
        imageUrl: castData.imageUrl.trim(),
        movie: castData.movie.trim()
    });

    await cast.save();

    return cast;
}

async function getAllCast() {
    return await Cast.find().lean();
}

module.exports = {
    createCast,
    getAllCast
}