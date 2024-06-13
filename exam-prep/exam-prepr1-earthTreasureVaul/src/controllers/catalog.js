const { Router } = require('express');
const { getAllStones, addStones } = require('../services/stoneService');

const catalogRoutes = Router();


catalogRoutes.get('/', async (req, res) => {
    const stones = await getAllStones();
    const user = req.user;
    console.log(`Stones: ${stones}`);
    console.log(`User: ${user}`);
    // for (const stone of stones) {
    //     stone.isOwner = user?._id == stone.owner;
    // }

    res.render('home', { stones });
});

catalogRoutes.get('/dashboard', async (req, res) => {
    res.render('dashboard');
});

catalogRoutes.get('/details', (req, res) => {
    const { id } = req.params;


    res.render('details',)
})

catalogRoutes.get('/create', async (req, res) => {
    // const owner = req.user._id
    console.log(req.user);
    res.render('create');
    
});

catalogRoutes.post('/create', async (req, res) => {
    const owner = req.user._id
    console.log(req.user);
    
    const errors = {
        name: !req.body.name,
        category: !req.body.category,
        color: !req.body.color,
        image: !req.body.image,
        location: !req.body.location,
        formula: !req.body.formula,
        description: !req.body.description,
    
    };
    
    if (Object.values(errors).includes(true)) {
        res.render('create', { stone: req.body, errors });
        return;
    }
    
    const result = await addStones(req.body, owner);
    res.redirect('/details/' + result.id)
})

catalogRoutes.get('/search', async (req, res) => {
    res.render('search');
});

module.exports = { catalogRoutes }