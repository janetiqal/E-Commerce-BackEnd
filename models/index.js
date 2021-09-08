// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey:'category_id',
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
})

// Categories have many Products
Category.hasMany(Product,{
  foreignKey:'category_id',
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
})

// Products belongToMany Tags (through ProductTag, aka the junction model)
Product.belongsToMany(Tag,{
  through:{
    model: ProductTag,
    unique: false,
    // foreignKey: 'product_tag',
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
  },//alias
    as: 'products_tagged'
})

// Tags belongToMany Products (through ProductTag aka the junction model)
Tag.belongsToMany(Product, {
 through:{
   model: ProductTag,
   unique: false,
  //  foreignKey: 'tag_id',
   onDelete: "SET NULL",
   onUpdate: "CASCADE"
},//alias, rename to be tag_of_products(multiple products but one tag)
  as: 'tags_of_products'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
