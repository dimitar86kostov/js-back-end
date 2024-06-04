const { login, register } = require("../services/authService");

module.exports = {

    registerGet: (req, res) => {
        const error = req.session.error;
        const formData = req.session.formData;
        delete req.session.error;
        delete req.session.formData;
        
        res.render('register', { error, formData });
    },
    registerPost: (req, res) => {
        const { username, password, repass } = req.body;

        try {
            if (!username) {
                throw new Error('Username is required!')
            }
            if (!password) {
                throw new Error('Password is required!')
            }
            if (password != repass) {
                throw new Error('Password don\'t match!')
            }

            const user = register(username, password);
            req.session.user = user;

            res.redirect('/')
        } catch (err) {
            req.session.error = {
                type: 'register',
                message: err.message
            };
            req.session.formData = { username };
            res.redirect('/register');
            return;
        }

        res.redirect('/');
    },

    loginGet: (req, res) => {
        const error = req.session.error;
        delete req.session.error;
        res.render('login', { error });
    },
    loginPost: (req, res) => {
        const { username, password } = req.body;

        try {
            const user = login(username, password);
            req.session.user = user;

            res.redirect('/')
        } catch (err) {
            req.session.error = {
                type: 'login',
                message: err.message
            };
            res.redirect('/login');
            return;
        }

        res.redirect('/');
    },

    logout: (req, res) => {
        req.session.user = undefined;

        res.redirect('/');

    }
}