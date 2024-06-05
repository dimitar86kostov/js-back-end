const { Router } = require('express');
const { homeController } = require('../controllers/home');
const { loginGet, loginPost, logout, registerGet, registerPost, details} = require('../controllers/auth');

const router = Router();

router.get('/', homeController);
router.get('/login', loginGet);
router.post('/login', loginPost);
router.get('/logout', logout);
router.get('/register', registerGet);
router.post('/register', registerPost);
router.get('/details', details);

module.exports = { router };