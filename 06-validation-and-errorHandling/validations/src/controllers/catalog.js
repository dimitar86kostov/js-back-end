const { body, validationResult } = require('express-validator');
const { Router } = require('express');

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.render('home');
});


homeRouter.post('/',
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 5 characters'),
        body('repass').trim().custom((value, { req }) => {
            return value == req.body.password;
        }).withMessage('Password don\'t match!'),
    (req, res) => {

        const result = validationResult(req);
        const errors = Object.fromEntries(result.errors.map(e => [e.path, e.msg]));

        if (result.errors.length) {
            res.render('home', { data: req.body, errors });
            return;
        }
        res.render('/');
    })

module.exports = { homeRouter }