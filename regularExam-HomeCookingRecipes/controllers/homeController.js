const { isAuth } = require('../middlewares/authMiddleware');
const recipeService = require('../services/recipeService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const latestPosts = await recipeService.getLatest().lean();
    res.render('home', { latestPosts });
});

router.get('/catalog', async (req, res) => {
    const recipes = await recipeService.getAll().lean();

    res.render('catalog', { recipes });
});

router.get('/search', async (req, res) => {
    const { search } = req.query;

    const result = await recipeService.search(search);
    res.render('search', { result });
});


module.exports = router;