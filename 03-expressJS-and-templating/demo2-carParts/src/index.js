const express = require('express');
const handlebars = require('express-handlebars');
const { homeControler } = require('./controllers/home');
const { catalogControler, detailsControler } = require('./controllers/catalog');
const { createControler, editController } = require('./controllers/parts');

const app = express();
const hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'default'
});
app.set('view engine', '.hbs');
app.engine('.hbs', hbs.engine);

app.use('static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.get('/', homeControler);
app.get('/catalog', catalogControler);
app.get('/catalog/:id', detailsControler);
app.get('/create', createControler.get);
app.post('/create', createControler.post);
app.get('/edit/:id', editController.get);
app.post('/edit/:id', editController.post);

app.get('*', (req, res) => {
    res.render('404');
})
app.listen(3000)