'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TelegramChannel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TelegramChannel.belongsTo(models.Cinema, {
        as: 'cinema',
        foreignKey: 'cinemaId'
      })
    }
  }
  TelegramChannel.init({
    channelName: DataTypes.STRING,
    channelUrl: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'TelegramChannel',
    underscored: true,
  });
  return TelegramChannel;
};