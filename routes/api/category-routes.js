const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// find all categories w its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryAndProduct = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryAndProduct);
  } catch (err) {
    res.status(500).json(err)
  }
});

// find one category by its `id` value w its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryAndProduct = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryAndProduct) {
      res.status(404).json({ message: "No Category found with that ID" })
      return;
    }
    res.status(200).json(categoryAndProduct);
  } catch (err) {
    res.status(500).json(err)
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body, {
      individualHooks: true
    });
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).json(err)
  }
});
// update a category by its `id` value
router.put('/:id', async (req, res) => {
 try {
   const updateCategoryData = await Category.update(req.body, {
    where:{
      id: req.params.id
    },
    individualHooks: true
   })
   if(!updateCategoryData[0]){
     res.status(404).json({message: "Category can't be updated because it does not exist"})
      return
  }
  res.status(200).json(updateCategoryData)
 } catch (err){
   res.status(400).json(err)
 }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategoryData = await Category.destroy({
      where:{
        id: req.params.id
      }
    })
    if(!deleteCategoryData){
      res.status(404).json({message: "Cannot delete a Category that doesn't exist"})
    }
    res.status(200).json(deleteCategoryData)
  } catch(err){
    res.status(400).json(err)
  }
});

module.exports = router;
