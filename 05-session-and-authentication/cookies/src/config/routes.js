const { Router } = require('express');
const { homeController, setController, getController, useLight, useDark } = require('../controllers/home');
const { getSession, setSession } = require('../controllers/session');

const router = Router();

router.get('/', homeController);
router.get('/set', setController);
router.get('/get', getController);
router.get('/use-light', useLight);
router.get('/use-dark', useDark);
router.get('/set-session', setSession);
router.get('/get-session', getSession);



module.exports = { router };