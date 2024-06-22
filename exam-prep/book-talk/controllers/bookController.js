const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtil');
const bookService = require('../services/bookService');

const router = require('express').Router();

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const newBook = req.body;

    try {
        await bookService.create(newBook, req.user._id);
        res.redirect('/catalog');
    } catch (err) {

        res.render('create', { ...newBook, error: getErrorMessage(err) });
    }
});

router.get('/details/:id', async (req, res) => {
    const book = await bookService.getOne(req.params.id).lean();

    book.isOwner = book.owner._id == req.user?._id;

    book.isWished = false;
    book.wishingList.forEach((u) => {
        if (u._id == req.user?._id) {
            book.isWished = true;
        }
    });

    res.render('details', { ...book });
});

router.get('/details/:id/edit', isAuth, async (req, res) => {
    const book = await bookService.getOne(req.params.id).lean();

    res.render('edit', { ...book });
});

router.post('/details/:id/edit', isAuth, async (req, res) => {
    const editedBook = req.body;

    try {
        await bookService.edit(req.params.id, editedBook);

        res.redirect(`/details/${req.params.id}`);
    } catch (err) {
        res.render('edit', { ...editedBook, error: getErrorMessage(err) });
    }
});

router.get('/details/:id/wish', isAuth,  async (req, res) => {
    await bookService.wish(req.params.id, req.user._id);
    
    res.redirect(`/details/${req.params.id}`);
});

router.get('/details/:id/delete', isAuth, async (req, res) => {

    await bookService.delete(req.params.id);

    res.redirect('/catalog');
});


async function isOwner(res, req, next) {
  
    const book = await bookService.getOne(req.params.id).lean();

    if (book.owner._id.toString() != req.user?._id) {
        return res.redirect('/catalog');
    }

    // req.book = book;
    next()
};

module.exports = router;