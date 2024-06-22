const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.use(routes);

// Change the name regarding the project
const connectionString = 'mongodb://127.0.0.1:27017/book-talk';
mongoose.connect(connectionString);

mongoose.connection.on('connected', () => console.log('DB is connected!'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected!'));
mongoose.connection.on('error', (err) => console.log(err));

app.listen(3000, () => console.log('App listening at port http://localhost:3000'))