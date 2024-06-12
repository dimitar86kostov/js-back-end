const { Router } = require('express');
const { register, login } = require("../services/authService");
const { createToken } = require("../services/token");
const { isGuest } = require('../middleware/guards');
const { body, validationResult } = require('express-validator');

const userRouter = Router();

userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

userRouter.post('/register',
    isGuest(),
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    async (req, res) => {
        const { email, password, rePass } = req.body;

        try {
            const errors = validationResult(req);
            if (errors.length) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }
            if (!email) {
                throw new Error('Email is required!');
            }
            if (!password) {
                throw new Error('Password is required');
            }
            if (password != rePass) {
                throw new Error('Password don\'t match!');
            }

            const user = await register(email, password);
            const token = createToken(user);
            res.cookie('token', token, { httpOnly: true });

            res.redirect('/');

        } catch (err) {
            res.render('register', { data: { email }, error: err.message })
            return;
        }
    });

userRouter.get('/login',
    isGuest(),

    (req, res) => {
        res.render('login');
    });

userRouter.post('/login',
    isGuest(),

    async (req, res) => {
        const { email, password } = req.body;

        try {
            if (!email) {
                throw new Error('Email is required!');
            }
            if (!password) {
                throw new Error('Password is required');
            }

            const user = await login(email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');

        } catch (err) {

            res.render('login', { data: { email }, error: err.message })
            return;
        }
    });

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = { userRouter };