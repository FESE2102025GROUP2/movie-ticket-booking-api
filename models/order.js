'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Define associations here
      Order.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });

      Order.belongsTo(models.Cinema, {
        as: 'cinema',
        foreignKey: 'cinemaId',
      });

      Order.hasMany(models.OrderItem, {
        as: 'orderItems',
        foreignKey: 'orderId',
      });
    }
  }

  Order.init({
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Picked-up', 'Cancelled'),
      allowNull: false, // Prevents NULL status
      defaultValue: 'Pending', // Default status value
    },
    cinemaId: {
      type: DataTypes.INTEGER,
      allowNull: false, // cinemaId is required
    },
    totalPrice: {
      type: DataTypes.DOUBLE, // Use DOUBLE for floating-point values
      allowNull: false, // Ensures totalPrice is required
    },
    paymentType: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    pickupTime: {
      type: DataTypes.TIME,
      allowNull: true, // Optional field
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at', // Maps to 'created_at' in your database
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at', // Maps to 'updated_at' in your database
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders', // Ensure this matches the actual table name in the DB
    underscored: true, // Use snake_case for field names
    timestamps: true, // Enable Sequelize's automatic timestamping
    createdAt: 'created_at', // Use 'created_at' column name for creation time
    updatedAt: 'updated_at', // Use 'updated_at' column name for update time
  });

  return Order;
};
