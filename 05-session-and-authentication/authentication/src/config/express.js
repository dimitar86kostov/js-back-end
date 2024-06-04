const { urlencoded, static: staticHandler } = require('express');
const session = require('express-session');



function expressConfig(app) {

    app.use(urlencoded({ extended: true }));
    app.use('/static', staticHandler('static'));
    app.use(session({
        secret: "deepjak",
        saveUninitialized: true,
        resave: true,
        cookie: { secure: false}
    }))
}

module.exports = { expressConfig }