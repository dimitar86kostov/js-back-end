let count = 0;

function countMiddleware(res, req, next) {
    count++;
    req.count = count;

    next();
}

module.exports = { countMiddleware }