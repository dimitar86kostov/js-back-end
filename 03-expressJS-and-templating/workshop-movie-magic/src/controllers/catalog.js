const { getAllMovies, getMovieById, searchMovie } = require('../services/movie');


module.exports = {

    homeController: async (req, res) => {
        const movies = await getAllMovies();
        const user = req.user;

        for (const movie of movies) {
            movie.isCreator = req.user?._id == movie.creatorId

        }

        res.render('home', { movies, user });
    },

    detailsController: async (req, res) => {
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
    },

    searchController: async (req, res) => {

        const { title, genre, year } = req.query;

        const movies = await searchMovie(title, genre, year);
        res.render('search', { movies, title, genre, year });
    }
}
