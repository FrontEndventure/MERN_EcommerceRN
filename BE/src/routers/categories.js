const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({success: false});
  }
  res.status(200).send(categoryList);
});

//get by id
router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const categoryList = await Category.findById(id)
    .then(res => {
      res.send(categoryList);
    })
    .catch(err => {
      //   console.log('error: ', err);
      res.status(500).json({success: false, message: 'Category not found'});
    });
});

router.post('/', async (req, res) => {
  const {name, color, icon} = req.body;
  let category = new Category({
    name,
    color,
    icon,
  });
  category = await category.save();

  // .then(createdCategory => {
  //   res.status(201).json(createdCategory);
  // })
  // .catch(err => {
  //   res.status(500).json({
  //     error: err,
  //     success: false,
  //   });
  // });
  if (!category) return res.status(400).send('the category cannot be created');

  res.send(category);
});

//api/v1/id
router.put('/:id', async (req, res) => {
  const {name, color, icon} = req.body;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
      color,
      icon,
    },
    {new: true},
  );
  if (!category) return res.status(400).send('the category cannot be update');

  res.send(category);
});

//api/v1/id
router.delete('/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then(category => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: 'category deleted',
        });
      } else {
        return res
          .status(404)
          .json({success: false, message: 'category can not delete'});
      }
    })
    .catch(err => {
      return res.status(400).json({success: false, error: err});
    });
});

module.exports = router;
