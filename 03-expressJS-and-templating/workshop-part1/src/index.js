const express = require('express');
const { hbsConfig } = require('./config/hbs');
const { expressConfig } = require('./config/express');
const { router } = require('./config/routes');

const port = 3000;

const app = express();


hbsConfig(app);
expressConfig(app);
app.use(router);

app.listen(port, console.log(`The app is running at ${port} port.`));
