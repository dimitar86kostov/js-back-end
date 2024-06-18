const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const { getErrorMessage } = require('../utils/errorUtil');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const courses = await courseService.getAll().lean();
    res.render('courses/catalog', { courses });
});


router.get('/create', isAuth, async (req, res) => {
    res.render('courses/create');
});

router.post('/create', isAuth, async (req, res) => {
    const newCourse = req.body;


    try {
        await courseService.createCourse(newCourse, req.user._id);

        res.redirect('/courses');
    } catch (err) {
        res.render('courses/create', { error: getErrorMessage(err), ...newCourse });
    }
});

router.get('/:courseId/details', async (req, res) => {
    try {
        const course = await courseService.getOneDetailed(req.params.courseId).lean();
        let isSignedUp = false;

        for (const user of course.signUpList) {
            if (user._id.toString() == req.user?._id) {
                isSignedUp = true;
                break;
            }
        }
        const isCreator = course.owner._id == req.user?._id;
        const signedUpUsers = course.signUpList.map(user => user.username).join(', ');

        res.render('courses/details', { course, isCreator, isSignedUp, signedUpUsers });
    } catch (err) {
        res.redirect('/courses', { error: getErrorMessage(err) });
    }
});

router.get('/:courseId/sign-up', async (req, res) => {

    try {
        await courseService.signUp(req.params.courseId, req.user._id);

        // const signedBy = course.signUpList.map(u => u.username);

        res.redirect(`/courses/${req.params.courseId}/details`);

    } catch (err) {
        res.redirect('/catalog', { error: getErrorMessage(err) });
    }
});

router.get('/:courseId/edit', isAuth, isOwner, async (req, res) => {
    const courseData = await courseService.getOneDetailed(req.params.courseId).lean();

    res.render('courses/edit', { ...req.course }); 
});

router.post('/:courseId/edit', isAuth, isOwner, async (req, res) => {
    const editedCourse = req.body;

    try {
        await courseService.edit(req.params.courseId, editedCourse);
        res.redirect(`/courses/${req.params.courseId}/details`);
    } catch (err) {
        res.render(`courses/edit`, { ...editedCourse, error: getErrorMessage(err) });
    }
});

router.get('/:courseId/delete', isOwner, async (req, res) => {

    // we can avoid this request as already set the query 'req.course' from isOwner function
    // const course = await courseService.getOne(req.params.courseId)
    res.render(`courses/delete`, { ...req.course });
});

router.post('/:courseId/delete', isOwner, async (req, res) => {
    await courseService.delete(req.params.courseId, req.user._id);

    res.redirect('/courses');
});


async function isOwner(req, res, next) {
    const course = await courseService.getOne(req.params.courseId).lean()

    if (course.owner != req.user?._id) {
        return res.redirect('/courses');
    }
    // reuse the same query everywhere with that middleware to avoid sending it again e.g. -> in edit controller
    req.course = course;

    next();
}

module.exports = router;