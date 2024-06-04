const { getAllMovies, getMovieById, searchMovie } = require('../services/movie');

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

        res.render('details', { movie });
    },

    searchController: async (req, res) => {

        const { title, genre, year } = req.query;

        const movies = await searchMovie(title, genre, year);
        res.render('search', { movies, title, genre, year });
    }
}
