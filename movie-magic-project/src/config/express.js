const { urlencoded, static: staticHandler } = require('express');

const cookieParser = require('cookie-parser');
const { session } = require('../middleware/session');

const secret = 'top secret';

function expressConfig(app) {

    app.use(cookieParser(secret));
    app.use(session());
    app.use(urlencoded({ extended: true }));
    app.use('/static', staticHandler('static'));
}

module.exports = { expressConfig }