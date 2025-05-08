'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cinema.hasMany(models.MovieShowtime, {
        foreignKey: 'cinemaId',
        as: 'movieShowtime' // Must match the alias used in your query
      });
      Cinema.hasMany(models.Order, {
        as: 'cinema',
        foreignKey: 'cinemaId'
      })
      Cinema.hasOne(models.TelegramChannel, {
        as: 'telegramchannle',
        foreignKey: 'cinemaId'
      })
    }
  }
  Cinema.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    contactInfo: DataTypes.STRING,
    orderIndex: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cinema',
    underscored: true,
  });
  
  return Cinema;
};