const { notFound } = require('../controllers/404');
const { catalogRoutes } = require('../controllers/catalog');
const { userRoutes } = require('../controllers/user');

function routesConfig(app) {

    app.use(catalogRoutes);
    app.use(userRoutes);

    app.get('*', notFound);
}


module.exports = { routesConfig };