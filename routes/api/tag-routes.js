const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get method for all tags
router.get('/', async (req, res) => {
  // includes its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get method for one tag by id query
router.get('/:id', async (req, res) => {
  // includes its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(tagData);
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this ID'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// post method to create new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by id query
router.put('/:id', async (req, res) => {

  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(tagData);
  } catch(err) {
    res.status(400).json(err);
  }
});

// delete on tag by id query
router.delete('/:id', async (req, res) => {

  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID'});
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
