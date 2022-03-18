/* eslint-disable eol-last */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // eslint-disable-next-line object-curly-newline
      New.belongsTo(models.Category, {
        as: 'category', foreignKey: 'categoryId' });
    }
  }
  New.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'New',
    timestamps: true,
    paranoid: true,
  });
  return New;
};