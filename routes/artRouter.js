const artController = require('../controllers/artController');

const artRouter = require('express').Router();

artRouter.route("/add")
    .get(artController.formAdd)
    .post(artController.addArt);
artRouter.get("/:id", artController.artById);
artRouter.post("/:id/edit", artController.updateArt);
artRouter.get("/:id/delete", artController.deleteArt);

module.exports = artRouter;