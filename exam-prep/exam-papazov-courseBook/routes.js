const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');

router.use(homeController);
router.use(courseController);
router.use('/auth', authController);

module.exports = router;