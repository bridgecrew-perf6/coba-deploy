const routes = require('express').Router();
const artController = require('../controllers/artController');
const artRouter = require("./artRouter");

routes.get('/', artController.home);
routes.use('/arts', artRouter);

module.exports = routes