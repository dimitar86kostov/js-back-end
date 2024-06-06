const { Router } = require('express');
const { homeController } = require('../controllers/catalog');

const router = Router();

router.get('/', homeController);

module.exports = { router };