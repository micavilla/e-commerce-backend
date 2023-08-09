const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get method for all categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get method for 1 category by id query
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with this ID'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// post method to create category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by id query
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err);
  }
});

// delete a category by id query
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID'});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
