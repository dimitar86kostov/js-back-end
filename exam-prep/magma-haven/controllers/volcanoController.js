const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtil');
const volcanoService = require('../services/volcanoService');

const router = require('express').Router();

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const createdVolcano = req.body;

    try {
        await volcanoService.create(createdVolcano, req.user._id);
        res.redirect('/catalog')

    } catch (err) {
        res.render('create', { ...createdVolcano, error: getErrorMessage(err) });

    }
});

router.get('/details/:volcanoId', async (req, res) => {
    const volcano = await volcanoService.getOne(req.params.volcanoId).lean();
   
    volcano.isOwner = volcano.owner._id == req.user?._id;

    volcano.alreadyVoted = false;
    volcano.voteList.forEach((user) => {
        if (user._id.toString() == req.user?._id) {
            volcano.alreadyVoted = true;
        }
    });

    res.render('details', { ...volcano });
});

router.get('/details/:volcanoId/vote', isAuth, async (req, res) => {

    await volcanoService.voted(req.volcano._id, req.user._id);

    res.redirect(`/details/${req.volcano._id}`);
});

router.get('/details/:volcanoId/edit', isAuth, isOwner, (req, res) => {

    res.render('edit', { ...req.volcano });
});

router.post('/details/:volcanoId/edit', isAuth, isOwner, async (req, res) => {
    const editedVolcano = req.body;

    try {
        await volcanoService.edit(req.volcano._id, editedVolcano);
        res.redirect(`/details/${req.volcano._id}`);

    } catch (err) {
        res.render('edit', { ...editedVolcano });
    }
});

router.get('/details/:volcanoId/delete', isAuth, isOwner, async (req, res) => {

    await volcanoService.delete(req.volcano._id);

    res.redirect('/catalog');
});

async function isOwner(req, res, next) {
    const volcano = await volcanoService.getOne(req.params.volcanoId).lean();

    if (volcano.owner._id.toString() != req.user?._id) {
        return res.redirect('/catalog');
    }
    req.volcano = volcano;
    next()
}


module.exports = router;