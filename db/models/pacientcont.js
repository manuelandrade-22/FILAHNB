'use strict';
const {
  Model
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

module.exports = (sequelize, DataTypes) => {
  class pacientCont extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      pacientCont.belongsTo(models.situacoes, {foreignKey:'status'})
    }
  }
  pacientCont.init({
    name: DataTypes.STRING,
    cell: DataTypes.STRING,
    senha: DataTypes.STRING,
    posicao: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pacientCont',
  });
  return pacientCont;
};