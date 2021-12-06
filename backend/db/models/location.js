'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.belongsTo(models.User, { foreignKey: 'ownerId' });
      Location.hasMany(models.Image, { foreignKey: 'locationId' });
    }
  };
  Location.init({
    ownerId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};
