const router = require('express').Router();
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtil');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie('auth', token);
        res.redirect('/home/');
    } catch (err) {
        res.render('auth/register', { error: getErrorMessage(err), userData });
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const loginData = req.body;

    try {
        const token = await authService.login(loginData);

        res.cookie('auth', token);
        res.redirect('/home/');
    } catch (err) {
        res.render('auth/login', { error: getErrorMessage(err), loginData });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth')
    res.redirect('/home/');
});


module.exports = router;