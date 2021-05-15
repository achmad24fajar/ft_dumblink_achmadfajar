'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Link.hasMany(models.Sosmed, {
        foreignKey: 'linkId'
      });
      Link.belongsTo(models.User, {foreignKey: 'userId'});
    }
  };
  Link.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    uniqueLink: DataTypes.STRING,
    viewCount: DataTypes.INTEGER,
    theme: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Link',
  });
  return Link;
};