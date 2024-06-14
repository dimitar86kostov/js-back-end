const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    // const courses = await courseService.getAllCourses().lean();
    res.render('home');
});

router.get('/catalog', async (req, res) => {

    res.render('catalog');
});

router.get('/details/:courseId', async (req, res) => {
    const { courseId } = req.params;
    console.log(courseId);
    const course = await courseService.getCourseById(courseId);
    console.log(course);

    res.render('details' + courseId);
});

module.exports = router;