const { Router } = require('express');
const { homeController, detailsController, searchController } = require('../controllers/catalog');
const { aboutController } = require('../controllers/about');
const { notFound } = require('../controllers/404');
const { createGet: createCastGet, createPost: createCastPost } = require('../controllers/cast');
const { createGet, createPost } = require('../controllers/movie');

const router = Router();

router.get('/', homeController);
router.get('/about', aboutController);
router.get('/details/:id', detailsController);
router.get('/create/movie', createGet);
router.post('/create/movie', createPost);
router.get('/create/cast', createCastGet);
router.post('/create/cast', createCastPost);
router.get('/search', searchController);

router.get('*', notFound);
module.exports = { router }