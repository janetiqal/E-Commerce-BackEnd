const { Model, DataTypes } = require('sequelize');
const capitalLetter = require('../helpers/functions')
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement: true,
    },
    category_name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is:/[a-z ]/
      },
    }
  },
  {
    hooks:{
      beforeCreate: async (newCategory)=>{
        newCategory.category_name = await capitalLetter(newCategory.category_name)
        return;  
      },
      beforeUpdate: async (updateCategory)=>{
        updateCategory.category_name = await capitalLetter(updateCategory.category_name)
        return;  
      },
  },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
