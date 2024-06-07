const { Movie } = require('../models/movies');

async function getAllMovies() {
    return await Movie.find().lean();
}

async function getMovieById(id) {

    const movie = await Movie.findById(id).lean().populate('cast');
    return movie;

}

async function createMovie(data, creator) {

    const movie = new Movie({
        title: data.title,
        genre: data.genre,
        director: data.director,
        year: Number(data.year),
        rating: Number(data.rating),
        description: data.description,
        imageURL: data.imageURL,
        creatorId: creator,
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
}

async function updateMovie(id, movieData) {

    const movie = await Movie.getMovieById(id);
    const updated = await Movie.findOneAndUpdate()

    // movie.title = movieData.title,
    // movie.genre = movieData.genre,
    // movie.director = movieData.director,
    // movie.year = movieData.year,
    // movie.imageURL = movieData.imageURL,
    // movie.rating = movieData.rating

}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    attachCastMovie,
    searchMovie,
    updateMovie
}