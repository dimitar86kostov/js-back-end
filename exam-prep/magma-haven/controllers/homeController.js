const volcanoService = require('../services/volcanoService');
const { isAuth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/catalog', async (req, res) => {
    const volcanoes = await volcanoService.getAll().lean();

    res.render('catalog', { volcanoes });
});

router.get('/search', async (req, res) => {
    const { name, typeVolcano } = req.query;

    const volcanoes = await volcanoService.search(name, typeVolcano);

    res.render('search', { name, typeVolcano, volcanoes });

});


module.exports = router;