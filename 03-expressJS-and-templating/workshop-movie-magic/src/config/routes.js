const { Router } = require('express');
const { homeController, detailsController, searchController } = require('../controllers/catalog');
const { aboutController } = require('../controllers/about');
const { notFound } = require('../controllers/404');
const { createCastGet, createCastPost } = require('../controllers/cast');
const { createGet, createPost, editGet, editPost } = require('../controllers/movie');
const { attachGet, attachPost } = require('../controllers/attach');
const { registerGet, registerPost, loginPost, loginGet, logout } = require('../controllers/auth');

const router = Router();

router.get('/', homeController);
router.get('/about', aboutController);
router.get('/details/:id', detailsController);
router.get('/search', searchController);

router.get('/create/movie', createGet);
router.post('/create/movie', createPost);
router.get('/create/cast', createCastGet);
router.post('/create/cast', createCastPost);
router.get('/attach/:id', attachGet);
router.post('/attach/:id', attachPost);
router.get('/edit/:id', editGet);
router.post('/edit/:id', editPost);


router.get('/register', registerGet);
router.post('/register', registerPost);
router.get('/login', loginGet);
router.post('/login', loginPost);
router.get('/logout', logout);

router.get('*', notFound);
module.exports = { router }