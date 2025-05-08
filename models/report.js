'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Report.belongsTo(models.User, {
        foreignKey: 'admin_id',
        as: 'GeneratedBy'
      });
    }
  }
  Report.init({
    date: DataTypes.DATE,
    content: DataTypes.STRING,
    generatedBy: {
      type: DataTypes.ENUM('systems', 'admin'),
      allowNull: false
    },
    sentToChannel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Report',
    underscored: true,
  });
  return Report;
};