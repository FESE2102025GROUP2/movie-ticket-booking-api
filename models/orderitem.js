'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Movie, {
        as: 'movie',
        foreignKey: 'movieId'
      })
      OrderItem.belongsTo(models.MovieShowtime, {
        as: 'movieShowtime',
        foreignKey: 'movieshowtimeId'
      })
      OrderItem.belongsTo(models.Order, {
        as: 'orders',
        foreignKey: 'orderId'
      })
    }
  }
  OrderItem.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Movies',
          key: 'id'
      }
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id'
    }
  },
  movieshowtimeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'MovieShowtime', // ensure your table name matches this
      key: 'id'
    }
  }
  }, {
    sequelize,
    modelName: 'OrderItem',
    underscored: true,
  });
  return OrderItem;
};