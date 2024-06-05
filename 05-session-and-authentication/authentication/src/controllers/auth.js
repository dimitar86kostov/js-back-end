const { login, register, getUserData } = require("../services/authService");

module.exports = {

    details: async (req, res) => {
        const userData = await getUserData();
        res.json(userData);
    },

    registerGet: (req, res) => {
        //saving error in the session storage to pass it in the template, then authService will throw an error if occur
        const error = req.session.error;
        //create formData and pass it to the template. If it's truthy will save the username written by the user // better client experience:))
        const formData = req.session.formData;
        delete req.session.error;
        delete req.session.formData;

        res.render('register', { error, formData });
    },
    registerPost: async (req, res) => {
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

            const user = await register(username, password);
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

        // this will send second response to the licent and error will occur:
        // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        // // res.redirect('/');  

    },

    loginGet: (req, res) => {
        const error = req.session.error;
        delete req.session.error;
        res.render('login', { error });
    },
    loginPost: async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await login(username, password);
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

    },

    logout: (req, res) => {
        req.session.user = undefined;

        res.redirect('/');

    }
}