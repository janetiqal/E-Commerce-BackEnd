const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

 // find all tags include its associated Product data
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include:[{model:Product , through: ProductTag, as: 'products_by_tag'}]
    })
    res.status(200).json(tagData)
  } catch(err){
    res.status(500).json(err)
  }
});
// find a single tag by its `id` w its associated Product data
router.get('/:id', async (req, res) => {
  try{
    const singleTagAndProducts= await Tag.findByPk(req.params.id,{
      include:[{model:Product , through: ProductTag, as: 'products_by_tag'}]
    })
    if(!singleTagAndProducts){
      res.status(404).json({message:"No tag found with that ID"})
    }
    res.status(200).json(singleTagAndProducts)
  } catch(err){
    res.status(500).json(err)
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try{
  const newTag= await Tag.create(req.body,{
    individualHooks: true
  });
  res.status(200).json(newTag)
  } catch(err){
    res.status(500).json(err)
  }
});
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
 try{
  const updateTagName = await Tag.update(req.body,{
    where:{
      id: req.params.id
    },
    individualHooks:true
  })
  if(!updateTagName[0]){
    res.status(404).json({message:"Cannot update Tag Name found with inputted ID"})
  }
  res.status(200).json(updateTagName)
} catch(err){
  res.status(500).json(err)
}
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
try{
  const deleteTag = await Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  if(!deleteTag){
    res.status(404).json({message:"Unable to delete a tag that doesn't exist"})
  }
  res.status(200).json(deleteTag)
}catch(err){
  res.status(500).json(err)
}
});

module.exports = router;
