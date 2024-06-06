const { urlencoded, static: staticHandler } = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');


function expressConfig(app) {

    app.use(urlencoded({ extended: true }));
    app.use('/static', staticHandler('static'));
    app.use(cookieParser('super secret'));
    app.use(session({
        secret: 'super secret',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
}

module.exports = { expressConfig }