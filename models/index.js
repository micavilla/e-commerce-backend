// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category; deletes related data through onDelete cascade
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
// Products belongToMany Tags through ProductTag product_id foreign key
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: 'product_id',
    unique: false,
  },
});
// Tags belongToMany Products through ProductTag tag_id foreign key
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreignKey: 'tag_id',
    unique: false,
  },
});

// exporting product, category, tag, and productTag as modules
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
