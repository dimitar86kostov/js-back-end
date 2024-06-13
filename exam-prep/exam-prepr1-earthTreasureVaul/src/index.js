const express = require('express');
const { hbsConfig } = require('./config/hbs');
const { expressConfig } = require('./config/express');
const { databaseConfig } = require('./config/database');
const { routesConfig } = require('../src/config/routes')

const PORT = process.env.PORT || 3000;

async function start() {
    const app = express()

    await databaseConfig();
    hbsConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(PORT, () => {
        console.log(`The app is running at ${PORT} port.`)
    });
}

start();