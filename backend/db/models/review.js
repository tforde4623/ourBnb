'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Location, { foreignKey: 'locationId' });
    Review.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Review;
};
