const { Router } = require("express");
const { createMovie, updateMovie, getMovieById, deleteMovie } = require("../services/movie");
const { isUser } = require("../middleware/guards");
const { parseError } = require("../util");
const { body, validationResult } = require('express-validator');

const movieRouter = Router();

movieRouter.get('/create/movie', isUser(), (req, res) => {
    res.render('create');
});

movieRouter.post('/create/movie',
    isUser(),
    body('imageURL').trim().isURL().withMessage('Please enter valid URL for movie poster'),
    body('genre').trim().isAlphanumeric().withMessage('Please enter only English letters and number'),
    async (req, res) => {
        const creator = req.user._id;

        try {
            const validation = validationResult(req);
            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await createMovie(req.body, creator);
            res.redirect('/details/' + result.id);

        } catch (err) {
            res.render('create', { movie: req.body, errors: parseError(err).errors });
            return
        }

    }
);

movieRouter.get('/edit/:id', isUser(),
    async (req, res) => {
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
    }
);

movieRouter.post('/edit/:id',
    isUser(),
    body('imageURL').trim().isURL().withMessage('Please enter valid URL for movie poster'),
    body('genre').trim().isAlphanumeric().withMessage('Please enter only English letters and number'),
    async (req, res) => {
        const movieId = req.params.id;
        const creatorId = req.user._id;


        try {
            const validation = validationResult(req);
            if (validation.errors.length) {
                throw validation.errors;
            }

            await updateMovie(movieId, req.body, creatorId);
            res.redirect('/details/' + movieId);

        } catch (err) {
            if (err.message == 'Access denied!') {
                res.redirect('/login');
            } else {
                res.render('edit', { movie: req.body, errors: parseError(err).errors });
            }
            return
        }

    }
);

movieRouter.get('/delete',
    isUser(),
    async (req, res) => {
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
    }
);
movieRouter.post('/delete',
    isUser(),

    async (req, res) => {
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
)


module.exports = { movieRouter }
