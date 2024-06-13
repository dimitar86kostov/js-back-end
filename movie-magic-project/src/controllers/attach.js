const { Router } = require("express");

const { getAllCast } = require("../services/cast");
const { getMovieById, attachCastMovie } = require("../services/movie");
const { isUser } = require("../middleware/guards");

const attachRouter = Router();

attachRouter.get('/attach/:id',
    isUser(),

    async (req, res) => {
        const { id } = req.params;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }

        const allCast = await getAllCast();
        const castInMovie = movie.cast.map(id => id.toString());


        res.render('cast-attach', { movie, allCast: allCast.filter(c => !castInMovie.find(castId => castId == c._id.toString())) });
    });

attachRouter.post('/attach/:id',
    isUser(),

    async (req, res) => {
        const { id } = req.params;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }

        const allCast = await getAllCast();
        const castInMovie = movie.cast.map(id => id.toString());


        res.render('cast-attach', { movie, allCast: allCast.filter(c => !castInMovie.find(castId => castId == c._id.toString())) });
    });


module.exports = { attachRouter }
