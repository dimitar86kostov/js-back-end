const { createMovie } = require("../services/movie");

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

        // if (!title || !genre || !director || !year || !imageURL || !rating || !description) {
        //     res.render('create', {
        //       title, genre, director, year, imageURL, rating, description,
        //         error: {
        //             title: !title, genre: !genre, director: !director, year: !year,
        //             imageURL: !imageURL, rating: !rating, description: !description
        //         }
        //     });
        //     return;
        // }

        const result = await createMovie(req.body);

        res.redirect('/details/' + result.id);
    }
}