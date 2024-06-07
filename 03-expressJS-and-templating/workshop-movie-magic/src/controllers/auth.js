const { register, login } = require("../services/authService");
const { createToken } = require("../services/token");

module.exports = {
    registerGet: (req, res) => {
        res.render('register');
    },
    registerPost: async (req, res) => {
        const { email, password, rePass } = req.body;

        try {
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
    },

    loginGet: (req, res) => {
        res.render('login');
    },
    loginPost: async (req, res) => {
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
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/');
    }
}