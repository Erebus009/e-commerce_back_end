const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories data
  const categories = await Category.findAll({
    include: {
      model: Product,
    },
  }).catch((err) => {
    res.json(err);
  });
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const category_id = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
    },
  }).catch((err) => {
    res.json(err);
  });
  res.json(category_id);
});

router.post("/", async (req, res) => {
  // creates a new category when POST method called
  try  {
    const createNewCategory = await Category.create(req.body);
    res.status(200).json(createNewCategory)
  } catch (err) {
    res.status(500).json(err)
  }
})  

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({category_name: req.body.category_name},{where:{ id:req.params.id}});
    if(!updateCategory[0]) {
      res.status(404).json({message : "No Categories match that Id| Or names match"})
    }
    res.status(200).json(updateCategory)
  } catch(err){
    res.status(500).json(err)
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyCategory = await Category.destroy({where:{id:req.params.id}});
    if(!destroyCategory) {
      res.status(404).json({message: "No Category macthes that ID"})
      }
    res.status(200).json(destroyCategory)
  } catch (err){
    res.status(500).json(err)
  }
})

module.exports = router;
