const { isAuth } = require('../middlewares/authMiddleware');
const stoneService = require('../services/stoneService');
const { getErrorMessage } = require('../utils/errorUtil');

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
    res.render('details', { ...stone });
});


module.exports = router;