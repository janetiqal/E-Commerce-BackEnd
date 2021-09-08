// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const capitalLetter = require('../helpers/functions')
// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        isDecimal: true
      }
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate:{
        isNumeric: true
      }
    },
    category_id:{
      type: DataTypes.INTEGER,
      references:{
        model: "category",
        key:"id",
      }
    }
  },
  {
    //product names are capitlized at each word, want to stay consistent w seed data
    hooks:{
      beforeCreate: async (newProductName)=>{
        newProductName.product_name = await capitalLetter(newProductName.product_name)
        return
      },
      beforeUpdate: async (updateProductName)=>{
        updateProductName.product_name = await capitalLetter(updateProductName.product_name)
        return
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
