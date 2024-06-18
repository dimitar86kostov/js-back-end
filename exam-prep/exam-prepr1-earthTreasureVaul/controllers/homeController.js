const { isAuth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/search', (req, res) => {
    res.render('search');
});

module.exports = router;