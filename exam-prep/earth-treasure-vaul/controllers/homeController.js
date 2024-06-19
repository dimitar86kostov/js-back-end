const { isAuth } = require('../middlewares/authMiddleware');
const stoneService = require('../services/stoneService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const latestPosts = await stoneService.getLatest().lean();

    res.render('home', { latestPosts });
});

router.get('/dashboard', async (req, res) => {
    const stones = await stoneService.getAll().lean();


    res.render('dashboard', { stones });
});

router.get('/search', async (req, res) => {
    
    const name = req.query;

    const stones = await stoneService.search(name).lean();
    res.render('search', { stones });

});

module.exports = router;