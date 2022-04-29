'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {

    static notif() {
      return Art.findAll({
        attributes: [
          [sequelize.cast(sequelize.fn('count', sequelize.col('id')),'integer'), 'totalArt'],
          [sequelize.fn('max', sequelize.fn('date_part', 'year', sequelize.col('date'))), 'latestYear'],
          [sequelize.fn('min', sequelize.fn('date_part', 'year', sequelize.col('date'))), 'oldestYear'],
        ],
        raw: true
      })
    }

    get simpleDate() {
      return new Date(this.date).toISOString().split("T")[0];
    }

  }
  Art.init({
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    placeOfOrigin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Art',
  });
  return Art;
};