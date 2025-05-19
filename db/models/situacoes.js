'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class situacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      situacoes.hasMany(models.pacientCont, {foreignKey:'nomeSituacao' })
    }
  }
  situacoes.init({
    nomeSituacao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'situacoes',
  });
  return situacoes;
};