const jwt = require('../lib/jwt');
const { SECRET } = require('../config');
const volcanoService = require('../services/volcanoService');



exports.authMiddleware = async (req, res, next) => {

    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodetToken = await jwt.verify(token, SECRET);

        req.user = decodetToken;
        res.locals.isAuthenticated = true;
        res.locals.user = decodetToken;

        next();
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};

exports.isAuth = async (req, res, next) => {
    
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    req.volcano = await volcanoService.getOne(req.params.volcanoId).lean();
    next();
}

exports.isGuest = (req, res, next) => {
    
    if (req.user) {
        return res.redirect('/');
    }

    next();
}