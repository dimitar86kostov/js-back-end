const { Router } = require('express');
const { homeController, detailsController, searchController } = require('../controllers/catalog');
const { aboutController } = require('../controllers/about');
const { notFound } = require('../controllers/404');
const { createCastGet, createCastPost } = require('../controllers/cast');
const { createGet, createPost, editGet, editPost, deleteGet, deletePost } = require('../controllers/movie');
const { attachGet, attachPost } = require('../controllers/attach');
const { userRouter } = require('../controllers/auth');
const { isUser } = require('../middleware/guards');

function routesConfig(app) {
    app.use(userRouter)


    app.get('/', homeController);
    app.get('/search', searchController);

    app.get('/details/:id', detailsController);
    app.get('/attach/:id', isUser(), attachGet);
    app.post('/attach/:id', isUser(), attachPost);
    app.get('/edit/:id', isUser(), editGet);
    app.post('/edit/:id', isUser(), editPost);
    app.get('/delete/:id', isUser(), deleteGet);
    app.post('/delete/:id', isUser(), deletePost);

    app.get('/create/movie', isUser(), createGet);
    app.post('/create/movie', isUser(), createPost);
    app.get('/create/cast', isUser(), createCastGet);
    app.post('/create/cast', isUser(), createCastPost);

    app.use(userRouter);

    app.get('/about', aboutController);
    app.get('*', notFound);
}




module.exports = { routesConfig }