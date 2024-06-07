const { getAllMovies, getMovieById, searchMovie } = require('../services/movie');

const jwt = require('jsonwebtoken');

module.exports = {

    homeController: async (req, res) => {

        const movies = await getAllMovies();
        res.render('home', { movies });
    },

    detailsController: async (req, res) => {
        const { id } = req.params;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }

        movie.starRating = '&#x2605'.repeat(movie.rating);

        console.log(movie.creatorId);
        console.log(req.user._id);
        console.log(req.user._id == movie.creatorId);
        
        const isCreator = req.user._id == movie.creatorId

        res.render('details', { movie, isCreator });
    },

    searchController: async (req, res) => {

        const { title, genre, year } = req.query;

        const movies = await searchMovie(title, genre, year);
        res.render('search', { movies, title, genre, year });
    }
}
