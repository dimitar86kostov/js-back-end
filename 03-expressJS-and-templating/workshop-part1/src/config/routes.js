const { Router } = require('express');
const { homeController, detailsController, searchController } = require('../controllers/catalog');
const { aboutController } = require('../controllers/about');
const { notFound } = require('../controllers/404');
const { createGet, createPost } = require('../controllers/movie');

const router = Router();

router.get('/', homeController);
router.get('/about', aboutController);
router.get('/create', createGet);
router.post('/create', createPost);
router.get('/details/:id', detailsController);
router.get('/search', searchController);

router.get('*', notFound);
module.exports = { router }