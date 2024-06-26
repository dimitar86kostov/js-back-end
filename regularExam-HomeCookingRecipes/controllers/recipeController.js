const { isAuth } = require('../middlewares/authMiddleware');
const recipeService = require('../services/recipeService');
const { getErrorMessage } = require('../utils/errorUtil');


const router = require('express').Router();

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const recipeData = req.body;

    try {
        await recipeService.create(recipeData, req.user._id);

        res.redirect('/catalog');
    } catch (err) {
        res.render('create', { ...recipeData, error: getErrorMessage(err) });
    }
});

router.get('/details/:id', async (req, res) => {
    const recipe = await recipeService.getOne(req.params.id).lean();
    console.log(recipe.recommendList);
    recipe.isOwner = recipe.owner._id == req.user?._id;

    recipe.isRecommend = false;
    recipe.recommendList.forEach((r) => {
        if (r._id.toString() == req.user?._id) {
            recipe.isRecommend = true;
        }
    });

    res.render('details', { ...recipe });
});

router.get('/details/:id/edit', isAuth, isOwner, async (req, res) => {
    const recipe = await recipeService.getOne(req.params.id).lean();

    res.render('edit', { ...recipe });
});

router.post('/details/:id/edit', isAuth, isOwner, async (req, res) => {
    const recipeData = req.body;

    try {
        await recipeService.edit(req.params.id, recipeData);

        res.redirect('/catalog');
    } catch (err) {
        res.render('edit', { ...recipeData, error: getErrorMessage(err) });
    }

    res.render('edit');
});

router.get('/details/:id/recommend', isAuth, recommGuard, async (req, res) => {
    try {
        await recipeService.recommend(req.params.id, req.user._id);
        console.log(req.params.id);

        res.redirect(`/details/${req.params.id}`);
    } catch (err) {
        res.render('catalog', { error: getErrorMessage(err) })
    }
});

router.get('/details/:id/delete', isAuth, isOwner, async (req, res) => {
    await recipeService.delete(req.params.id);

    res.redirect('/catalog');
});

async function isOwner(req, res, next) {
    const recipe = await recipeService.getOne(req.params.id).lean();

    if (recipe.owner._id != req.user?._id) {
        return res.redirect('/catalog');
    }

    next();
};

async function recommGuard(req, res, next) {
    const recipe = await recipeService.getOne(req.params.id).lean();

    if (recipe.owner._id == req.user?._id) {
        return res.redirect('/catalog');
    }

    next();
};


module.exports = router;