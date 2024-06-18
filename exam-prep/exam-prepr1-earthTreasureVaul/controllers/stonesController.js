const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorUtil');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    res.redirect('/create');
});

router.get('/catalog', (req, res) => {
    res.render('catalog');
})



module.exports = router;