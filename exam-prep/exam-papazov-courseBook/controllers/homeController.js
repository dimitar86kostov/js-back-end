const courseService = require('../services/courseService');
const userService = require('../services/userService');
const { isAuth } = require('../middlewares/authMiddleware');


const router = require('express').Router();

router.get('/', async (req, res) => {
    // This sends too many requests (and save all data in the memery)! Never do it, the proper way is with 'createdAt:Date' property in the Course model, then sort() them in the cervice

    // const courses = await courseService.getAll().lean();
    // const result = courses.map(c => (c._id)).slice(-3);
    // const arr = [];
    // for (let i = 0; i < result.length; i++) {
    //     arr.push(await courseService.getOne(result[i]).lean())
    // }

    const latestCourses = await courseService.getLatest().lean();

    console.log(latestCourses);

    res.render('home/home', { latestCourses });
});

router.get('/profile', isAuth, async (req, res) => {
    const user = await userService.getUserInfo(req.user._id).lean();
    // There is better way with getUserInfo.populate(['createdCourses', 'signedUpCourses'])

    const cCourses = [];
    for (const el of user.createdCourses) {
        const course = await courseService.getOneDetailed(el).lean();
        cCourses.push(course);
    }

    const signCourses = [];
    for (const el of user.signedUpCourses) {
        const course = await courseService.getOneDetailed(el).lean();
        signCourses.push(course);
    }

    res.render('home/profile', { user, cCourses, signCourses });
});


module.exports = router;