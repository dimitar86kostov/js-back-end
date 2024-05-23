const express = require('express');
const path = require('path');
const { countMiddleware } = require('./middlewares/counter');
const { dataController, jsonControler } = require('./data');
const app = express();
const port = 3000;

const homeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/style.css">
    <title>Document</title>
</head>
<body>
   <h1>HOME</h1>
   <li><a href="/">Home Page</a></li>
   <li><a href="/Catalog">Catalog</a></li>
   <img src="/static/les7.jpg>"
</body>
</html>`;

const catalogHtml = `
<h1>CATALOG</h1>
<li><a href="/">Home Page</a></li>
<li><a href="/Catalog">Catalog</a></li>`;

app.use('/new', countMiddleware, jsonControler)

app.get('/', countMiddleware, (req, res) => {
    console.log(req.count);

    res.status(200);
    res.send(homeHtml)
});

app.use('/static', express.static('static'));

app.get('/catalog', (req, res) => {

    res.status(200);
    res.send(catalogHtml)
});

app.get('/catalog/:place/:tripId', (req, res) => {
    const tripIdName = req.params.tripId
    const place = req.params.place

    res.send(catalogHtml + `<h2>You going to ${place}</h2>` + `<p>For ${tripIdName}</p>`)
});

app.get('/data', countMiddleware, dataController);

app.get('*', (req, res) => {
    res.status(404);
    res.send('404 Page Not Found!')
})

app.listen(port, () => console.log(`Express runing on ${port} port`));