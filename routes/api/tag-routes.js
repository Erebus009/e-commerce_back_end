const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tags = await Tag.findAll({include: {model: Product}}).catch((err) => {
    res.status(500).json(err)
  })
  res.status(200).json(tags)
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const singleTag = await Tag.findOne({where:{id: req.params.id}}, {include: {model: Product}}).catch((err) => {
    res.status(500).json(err)
  })
  if(!singleTag){
    res.json({message:"No tag associatedwith this ID"})
  }
  res.status(200).json(singleTag)
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
