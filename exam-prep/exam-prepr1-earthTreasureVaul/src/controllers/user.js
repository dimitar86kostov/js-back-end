const { Router } = require('express');
const { createToken } = require('../services/token.js');
const { register, login } = require('../services/userService');

const userRoutes = Router();

userRoutes.get('/register', (req, res) => {
    res.render('register');
})

userRoutes.post('/register', async (req, res) => {
    const { email, password, repass } = req.body;

    try {
        const user = await register(email, password, repass);
        const token = createToken(user);
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.render('register', { data: email, error: err.message });

        return;
    }

})

userRoutes.get('/login', (req, res) => {
    res.render('login');
})

userRoutes.post('/login', async (req, res) => {
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

userRoutes.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = {
    userRoutes
}