const express = require('express');
const { hbsConfig } = require('./config/hbs');
const { expressConfig } = require('./config/express');
const { router } = require('./config/routes');
const { databaseConfig } = require('./config/database');

const port = 3000;

async function start() {
    const app = express();

    await databaseConfig();
    hbsConfig(app);
    expressConfig(app);
    app.use(router);


    app.listen(port, console.log(`The app is running at ${port} port.`));
}

start();


