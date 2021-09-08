const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name:{
      type: DataTypes.STRING
    }
  },
  {
    hooks:{
      //data in the tag_name column seem to be all lowercase, so if database is updated or added to, want it to be consistent w seed data
      beforeCreate: async (newTagName)=>{
        newTagName.tag_name = await newTagName.tag_name.toLowerCase();
        return newTagName;
      },
      beforeUpdate: async (updateTagName)=>{
        updateTagName.tag_name = await updateTagName.tag_name.toLowerCase();
        return updateTagName;
      },
  },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
