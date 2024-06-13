const { catalogRouter } = require('../controllers/catalog');
const { aboutController } = require('../controllers/about');
const { notFound } = require('../controllers/404');
const { castRouter } = require('../controllers/cast');
const { movieRouter } = require('../controllers/movie');
const { attachRouter } = require('../controllers/attach');
const { userRouter } = require('../controllers/auth');

function routesConfig(app) {
    
    app.use(catalogRouter);
    app.use(attachRouter);
    app.use(castRouter);
    app.use(movieRouter)
    app.use(userRouter);

    app.get('/about', aboutController);
    app.get('*', notFound);
}




module.exports = { routesConfig }