const { Movie } = require('../models/movies');

async function getAllMovies() {
    return await Movie.find().lean();
}

async function getMovieById(id) {

    const movie = await Movie.findById(id).lean().populate('cast');
    return movie;

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

async function attachCastMovie(movieId, castId) {
    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error(`Movie ${movieId} is not found!`)
    }
    movie.cast.push(castId);
    await movie.save();
    return movie;
}

async function searchMovie(title, genre, year) {
    let result = await getAllMovies()

    if (title) {
        result = result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (genre) {
        result = result.filter(movie => movie.genre.toLowerCase() == genre.toLowerCase());

    }
    if (year) {
        result = result.filter(movie => movie.year == year);

    }

    return result;
    // const result = Movie.find(query).lean();
    // return result;
}

// function uuid() {
//     // manual id generator
//     return 'xxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
// }

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    attachCastMovie,
    searchMovie
}