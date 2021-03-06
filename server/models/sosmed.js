'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sosmed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sosmed.belongsTo(models.Link, {foreignKey: 'linkId'});
    }
  };
  Sosmed.init({
    titleLink: DataTypes.STRING,
    urlLink: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    linkId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sosmed',
  });
  return Sosmed;
};