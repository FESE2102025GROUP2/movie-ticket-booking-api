'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.MovieShowtime, {
        as: 'movieShowtime',
        foreignKey: 'movieId'
      })
      Movie.hasMany(models.Cart, {
        as: 'cart',
        foreignKey: 'movieId',
      })
      Movie.hasMany(models.OrderItem, {
        as: 'orderitem',
        foreignKey: 'movieId'
      })
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active'
    },
    
  }, {
    sequelize,
    modelName: 'Movie',
    underscored: true,
  });
  return Movie;
};