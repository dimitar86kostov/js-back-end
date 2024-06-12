const { createMovie, updateMovie, getMovieById, deleteMovie } = require("../services/movie");

module.exports = {
    createGet: (req, res) => {

        res.render('create');
    },
    createPost: async (req, res) => {


        const errors = {
            title: !req.body.title,
            genre: !req.body.genre,
            director: !req.body.director,
            year: !req.body.year,
            imageURL: !req.body.imageURL,
            rating: !req.body.rating,
            description: !req.body.description
        }

        if (Object.values(errors).includes(true)) {
            res.render('create', { movie: req.body, errors });
            return;
        }
        const creator = req.user._id;
        const result = await createMovie(req.body, creator);

        res.redirect('/details/' + result.id);
    },

    editGet: async (req, res) => {
        const { id } = req.params;
        let movie;
        try {
            movie = await getMovieById(id);
            if (!movie) {
                throw new Error('Movie not found!')
            }
        } catch (error) {
            res.render('404');
            return
        }

        const isCreator = req.user._id == movie.creatorId;
        if (!isCreator) {
            res.redirect('/login');
            return;
        }

        res.render('edit', { movie });
    },


    editPost: async (req, res) => {
        const movieId = req.params.id;
        const creatorId = req.user._id;

        const errors = {
            title: !req.body.title,
            genre: !req.body.genre,
            director: !req.body.director,
            year: !req.body.year,
            rating: !req.body.rating,
            description: !req.body.description,
            imageURL: !req.body.imageURL
        }

        if (Object.values(errors).includes(true)) {
            res.render('edit', { movie: req.body, errors });
            return;
        }
      
        try {
            await updateMovie(movieId, req.body, creatorId);
        } catch (err) {
            if (err.message == 'Access denied!') {
                res.redirect('/login');
            } else {
                res.render('404');
            }
            return
        }

        res.redirect('/details/' + movieId);
    },

    deleteGet: async (req, res) => {
        const { id } = req.params;

        let movie;
        try {
            movie = await getMovieById(id);
            if (!movie) {
                throw new Error('Movie not found!')
            }
        } catch (error) {
            res.render('404');
            return
        }

        const isCreator = req.user._id == movie.creatorId;
        if (!isCreator) {
            res.redirect('/login');
            return;
        }
        res.render('delete', { movie });
    },

    deletePost: async (req, res) => {
        const movieId = req.params.id;
        const creatorId = req.user._id;
        console.log(movieId);
        try {
            await deleteMovie(movieId, creatorId);
        } catch (err) {
            if (err.message == 'Access denied!') {
                res.redirect('/login');
            } else {
                res.render('404');
            }
            return
        }
        res.redirect('/')
    }


}
