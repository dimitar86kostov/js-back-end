const express = require('express');
const { hbsConfig } = require('./config/hbs');
const { expressConfig } = require('./config/express');
const { router } = require('./config/routes');
const { databaseConfig } = require('./config/database');
const { configRoutes } = require('./config/routes');

const PORT = process.env.PORT || 3000;

async function start() {
    const app = express()

    await databaseConfig();
    hbsConfig(app);
    expressConfig(app);
    configRoutes(app);

    app.listen(PORT, () => {
        console.log(`The app is running at ${PORT} port.`)
    });
}

start();