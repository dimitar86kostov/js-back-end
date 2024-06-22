const { isAuth } = require('../middlewares/authMiddleware');
const bookService = require('../services/bookService');
const userService = require('../services/userService');


const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/catalog', async (req, res) => {
    const books = await bookService.getAll().lean();
    res.render('catalog', { books });
});

router.get('/profile', async (req, res) => {
    const user = await userService.getOne(req.user._id).lean();

    let hasWishedBooks = user.wishingBooks.length != 0;

    const result = [];
    user.wishingBooks.forEach(b => result.push(b));

    res.render('profile', { hasWishedBooks, result });
});


module.exports = router;