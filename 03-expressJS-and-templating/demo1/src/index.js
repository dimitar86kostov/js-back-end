const express = require('express');
const { countMiddleware } = require('./middlewares/counter');
const { dataController } = require('./data');
const app = express();
const port = 3000;

const homeHtml = `
<h1>HOME</h1>
<li><a href="/">Home Page</a></li>
<li><a href="/Catalog">Catalog</a></li>`;

const catalogHtml = `
<h1>CATALOG</h1>
<li><a href="/">Home Page</a></li>
<li><a href="/Catalog">Catalog</a></li>`;

app.get('/', countMiddleware, (req, res) => {
    console.log(req.count);

    res.status(200);
    res.send(homeHtml)
});


app.get('/catalog', (req, res) => {

    res.status(200);
    res.send(catalogHtml)
});

app.get('/catalog/:place/:tripId', countMiddleware, (req, res) => {
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