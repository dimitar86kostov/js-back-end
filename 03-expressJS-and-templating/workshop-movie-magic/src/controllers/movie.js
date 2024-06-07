const { createMovie, updateMovie, getMovieById } = require("../services/movie");

module.exports = {
    createGet: (req, res) => {
        console.log(req.user._id);

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

        const movie = await getMovieById(id);
        console.log(req.user._id);

        res.render('edit', { movie });
    },

    editPost: async (req, res) => {
        const { id } = req.params;

        const { title, genre, director, year, imageURL, rating } = req.body;

        if (!title || !genre || !director || !year || !imageURL || !rating) {
            res.render('edit', {
                title, genre, director, year, imageURL, rating,
                error: {
                    title: !title, genre: !genre, director: !director, year: !year, imageURL: !imageURL, rating: !rating
                }
            })
            return;
        }

        await updateMovie(id, req.body);

        res.redirect('/')
    }
}