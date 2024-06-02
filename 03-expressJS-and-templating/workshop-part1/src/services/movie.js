const { Movie } = require('../models/movies');

async function getAllMovies() {
    return await Movie.find().lean();
}

async function getMovieById(id) {

    return await Movie.findById(id).lean();

}

async function createMovie(data) {

    const movie = new Movie({
        title: data.title,
        genre: data.genre,
        director: data.director,
        year: Number(data.year),
        rating: Number(data.rating),
        description: data.description,
        imageURL: data.imageURL,
        cast: []
    });

    await movie.save();
    return movie;
}

// function uuid() {
//     // id generator
//     return 'xxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
// }

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie
}