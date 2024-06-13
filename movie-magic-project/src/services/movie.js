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
        title: data.title.trim(),
        genre: data.genre.trim(),
        director: data.director.trim(),
        year: Number(data.year),
        rating: Number(data.rating),
        description: data.description.trim(),
        imageURL: data.imageURL.trim(),
        creatorId: creator,
    });

    await movie.save();
    return movie;
}

async function attachCastMovie(movieId, castId, userId) {
    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error(`Movie ${movieId} is not found!`)
    }
    
    if (movie.creatorId != userId) {
        throw new Error(`Access denied!`)
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

async function updateMovie(movieId, movieData, userId) {

    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error(`Movie ${movieId} not find!`)
    }
    if (movie.creatorId != userId) {
        throw new Error(`Access denied!`)
    }

        movie.title = movieData.title.trim(),
        movie.genre = movieData.genre.trim(),
        movie.director = movieData.director.trim(),
        movie.year = movieData.year,
        movie.rating = movieData.rating,
        movie.description = movieData.description.trim(),
        movie.imageURL = movieData.imageURL.trim(),

        await movie.save();
    return movie;
}

async function deleteMovie(movieId, userId) {
    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error(`Movie ${movieId} not find!`)
    }
    if (movie.creatorId != userId) {
        throw new Error(`Access denied!`)
    }

    await Movie.findByIdAndDelete(movieId)

}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    attachCastMovie,
    searchMovie,
    updateMovie,
    deleteMovie
}