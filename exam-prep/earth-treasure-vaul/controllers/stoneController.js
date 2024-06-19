const { isAuth } = require('../middlewares/authMiddleware');
const stoneService = require('../services/stoneService');
const { getErrorMessage } = require('../utils/errorUtil');
const { body, validationResult } = require('express-validator');

const router = require('express').Router();

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {

    const createdStone = req.body;
    try {
        await stoneService.createStone(createdStone, req.user._id);

        res.redirect('/dashboard')
    } catch (err) {

        res.render('create', { ...createdStone, error: getErrorMessage(err) });
    }
});

router.get('/:stoneId/details', async (req, res) => {
    const stone = await stoneService.getOne(req.params.stoneId).lean();
    let isLiked = false;

    stone.likedList.forEach((stone) => {
        if (stone._id.toString() == req.user?._id) {
            isLiked = true;
        }
    })

    const isOwner = stone.owner._id == req.user?._id;

    res.render('details', { stone, isOwner, isLiked });
});

router.get('/:stoneId/edit', isAuth, isOwner, async (req, res) => {
    const stone = await stoneService.getOne(req.params.stoneId).lean();

    res.render('edit', { ...stone });
});

router.post('/:stoneId/edit', isAuth, isOwner,
    // body('name').trim().isLength({min: 2}),
    async (req, res) => {
    const stoneId = req.params.stoneId;
    const editedStone = req.body;
    try {
        // const validation = validationResult(req);
        // if (validation.errors.length) {
        //     throw validation.errors;
        // }

        await stoneService.edit(stoneId, editedStone)

        res.redirect(`/${stoneId}/details`);
    } catch (err) {
        res.render('edit', { ...editedStone, error: getErrorMessage(err) });
    }
});

router.get('/:stoneId/liked', async (req, res) => {
    try {
        await stoneService.liked(req.params.stoneId, req.user._id);
        res.redirect(`/${req.params.stoneId}/details`);
    } catch (err) {
        res.render('/dashboard', { error: getErrorMessage(err) })
    }
});

router.get('/:stoneId/delete', isOwner, async (req, res) => {

    await stoneService.delete(req.params.stoneId);

    res.redirect(`/dashboard`);
});

async function isOwner(req, res, next) {
    const stone = await stoneService.getOne(req.params.stoneId).lean();

    if (req.user?._id != stone.owner._id) {

        return res.redirect('/dashboard');
    }
    
    next();
}

module.exports = router;