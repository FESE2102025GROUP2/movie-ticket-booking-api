'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieShowtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieShowtime.belongsTo(models.Movie, {
        as: 'movie',
        foreignKey: 'movieId'
      });
      MovieShowtime.belongsTo(models.Cinema, {
        foreignKey: 'cinemaId',
        as: 'cinema'
      });
      MovieShowtime.hasMany(models.Cart, {
        as: 'cart',
        foreignKey: 'movieshowtimeId'
      });
      MovieShowtime.hasMany(models.OrderItem, {
        as: 'orderItems',
        foreignKey: 'movieshowtimeId'
      })
      
    }
  }
  MovieShowtime.init({
    dayOfWeek: DataTypes.STRING,
    time: DataTypes.TIME,
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cinemaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'MovieShowtime', // keep model name singular
    underscored: true,
    timestamps: true
  });
  return MovieShowtime;
};