const { getAllMovies, getMovieById } = require('../services/movie');

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
    searchController: (req, res) => {

        res.render('search');
    }
}
