const { homeRouter } = require('../controllers/catalog');

function configRoutes(app) {
    
    app.use(homeRouter);
}

module.exports = { configRoutes };