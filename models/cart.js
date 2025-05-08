'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      })
      Cart.belongsTo(models.Movie, {
        as: 'cartmovie',
        foreignKey: 'movieId',
      })
      Cart.belongsTo(models.MovieShowtime, {
        as: 'cartMovieshowtime',
        foreignKey: 'movieshowtimesId'
      })
      Cart.belongsTo(models.Cinema, {
        as: 'cartcinema',
        foreignKey: 'cinemaId'
      })
    }
  }
  Cart.init({
    addedAt: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cart',
    underscored: true,
  });
  return Cart;
};