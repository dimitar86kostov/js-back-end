const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const { getErrorMessage } = require('../utils/errorUtil');

const router = require('express').Router();

router.get('/create', async (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newCourse = req.body;

    try {
        await courseService.createCourse(newCourse, req.user._id);
        res.redirect('/');
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('create', { error: message, ...newCourse });
    }
});

module.exports = router;
