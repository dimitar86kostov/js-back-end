const http = require('http');
const { staticFileHandler } = require('./handlers/static');
const { homeHandler } = require('./handlers/home');
const { addBreedHandler, postBreedHandler } = require('./handlers/addBreed');
const { addCatHandler, postCatHandler } = require('./handlers/addCat');

const routes = {
    'GET': {
        '/': homeHandler,
        '/index.html': homeHandler,
        '/cats/add-breed': addBreedHandler,
        '/cats/add-cat': addCatHandler,

    },
    "POST": {
        '/cats/add-breed': postBreedHandler,
        '/cats/add-cat': postCatHandler,
    }
}

http.createServer((req, res) => {
    const methodRoutes = routes[req.method];

    if (methodRoutes) {
        const route = methodRoutes[req.url];
        if (typeof route == 'function') {
            route(req, res);
            return
        }
    }

    if (staticFileHandler(req, res)) {
        return;
    }

    res.writeHead(404, [
        'Content-Type', 'text/plaint'
    ]);
    console.log(methodRoutes);
    res.write('404 not found');
    res.end();

}).listen(3000);

