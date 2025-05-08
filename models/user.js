'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        as: 'profile',
        foreignKey: 'userId',
      })
      User.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'userId',
      })
      User.hasMany(models.ActivityLog, {
        as: 'activitylog',
        foreignKey: 'userId',
      })
      User.hasMany(models.Cart, {
        as: 'cart',
        foreignKey: 'userId',
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('User', 'admin'),
      defaultValue: "User"
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      field: 'googleId'  // Sequelize will now look for "googleId" instead of "google_id"
    }

  }, {
    sequelize,
    modelName: 'User',
    underscored:true,
  });
  return User;
};