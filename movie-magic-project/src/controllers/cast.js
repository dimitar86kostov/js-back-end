const { Router } = require("express");

const { createCast } = require("../services/cast");
const { isUser } = require("../middleware/guards");

const castRouter = Router();

castRouter.get('/create/cast', isUser(), (req, res) => {
    res.render('cast-create');
});
castRouter.post('/create/cast', 
    isUser(), 
    
    async (req, res) => {
    const errors = {
        name: !req.body.name,
        age: !req.body.age,
        born: !req.body.born,
        nameInMovie: !req.body.nameInMovie,
        imageUrl: !req.body.imageUrl
    }

    if (Object.values(errors).includes(true)) {
        res.render('cast-create', { cast: req.body, errors });
        return;
    }
    const result = await createCast(req.body);


    res.redirect('/');
});

module.exports = { castRouter } 
