const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  const allTags = await Tag.findAll({
    include: {
      model: Product,
      attributes: ["product_name", "price", "category_id", "stock"],
    },
  }).catch((err) => {
    res.json(err);
  });
  res.status(200).json(allTags);
});
//------------------------------
// Find a single tag by its `id`|
//------------------------------

router.get("/:id", async (req, res) => {
  const singleTag = await Tag.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attributes: ["product_name", "price", "category_id", "stock"],
    },
  }).catch((err) => {
    res.status(500).json(err);
  });
  if (!singleTag) {
    res.json({ message: "No tag associated with this ID" });
  }
  res.status(200).json(singleTag);
});
//=====================================================
// POST a single tag that meets the req.body conditions
//======================================================


router.post("/", async (req, res) => {
  // create a new tag
  const createTag = await Tag.create({ tag_name: req.body.tag_name }).catch(
    (err) => {
      res.status(500).json(err);
    }
  );
  res.status(200).json(createTag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(
    { tag_name: req.body.tag_name },
    { where: { id: req.params.id } }
  ).catch((err) => {
    res.status(500).json(err);
  });

  res.status(200).send(updateTag);
});
//==================================
// Deletes a single tag based on it's tag id 
//=======================================


router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const destoryTag = await Tag.destroy({where:{id : req.params.id}}).catch((err) => {
    res.status(500).json(err)
  })
  if(!destoryTag){
    res.status(404).json({message:"No Tag matches that ID"})
  }
  res.status(200).json(destoryTag)
});

module.exports = router;
