const { Art } = require("../models");
const { Op } = require('sequelize');

class artController {
    static home(req, res) {
        const { name, artist } = req.query;
        const option = { where : {} };
        !name ? 0 : option.where.name = { [Op.iLike]: `%${name}%` };
        !artist ? 0 : option.where.artist = { [Op.iLike]: `%${artist}%` };
        option.order = [['date', 'desc']];

        let notif = 0;
        Art.notif()
            .then(result => {
                [notif] = result;
                return Art.findAll(option);
            }).then(data => {
                res.render('home', {arts : data, notif});
            }).catch(err => {
                res.send(err);
            });
    }
    static formAdd(req, res) {
        res.render('formAdd');
    }
    static addArt(req, res) {
        const {name, artist, date, photo, placeOfOrigin, description } = req.body;
        const option = {name, artist, date, photo, placeOfOrigin, description};
        Art.create(option)
            .then(() => {
                res.redirect('/');
            }).catch(err => {
                res.send(err);
            })
    }
    static artById(req, res) {
        const id = req.params.id;
        Art.findByPk(+id)
            .then(art => {
                res.render('formEdit',{ art });
            }).catch(err => {
                res.send("Not Found");
            })
    }
    static updateArt(req, res) {
        const id = req.params.id;
        const {name, artist, date, photo, placeOfOrigin, description } = req.body;
        const option = {name, artist, date, photo, placeOfOrigin, description};
        Art.update(option, {where: {id : +id}})
            .then(() => {
                res.redirect('/');
            }).catch(err => {
                res.send(err);
            })
    }
    static deleteArt(req, res) {
        const id = req.params.id;
        Art.destroy({where: { id: `${+id}` } })
            .then(() => {
                res.redirect('/');
            }).catch(err => {
                res.send(err);
            })
        
    }
}

module.exports = artController;