const { Router } = require("express");

const { getAllMovies, getMovieById, searchMovie } = require('../services/movie');

const catalogRouter = Router();

catalogRouter.get('/', async (req, res) => {
    const movies = await getAllMovies();
    const user = req.user;

    for (const movie of movies) {
        movie.isCreator = req.user?._id == movie.creatorId

    }

    res.render('home', { movies, user });
});

catalogRouter.get('/details/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await getMovieById(id);
    if (!movie) {
        res.render('404');
        return;
    }

    movie.starRating = '&#x2605'.repeat(movie.rating);


    // const isCreator = req.user?._id == movie.creatorId;;;;;=> separate variable doesn't work
    movie.isCreator = req.user?._id == movie.creatorId; //it must be new property of the object

    res.render('details', { movie });
});

catalogRouter.get('/search', async (req, res) => {

    const { title, genre, year } = req.query;

    const movies = await searchMovie(title, genre, year);
    res.render('search', { movies, title, genre, year });
});

module.exports = { catalogRouter }

