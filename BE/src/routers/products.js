import express from 'express';
import {Category} from '../models/category';
const router = express.Router();

// http://localhost:3000/api/v1/products
const {Product} = require('../models/product');

router.get(`/`, async (req, res) => {
  // const productList = await Product.find().select('name image');
  const productList = await Product.find();
  if (!productList) {
    res.status(500).json({success: false});
  }
  res.send(productList);
});

//get product by id
router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const productList = await Product.findById(id).populate('category');
  if (!productList) {
    res.status(500).json({success: false, message: 'Product not found'});
  }
  res.send(productList);
});

router.post(`/`, async (req, res) => {
  const {
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;
  Category.findById(category, function (err, data) {
    if (err) {
      res.status(400).send('invalid Category');
    }
  });
  //pake destructuring variable

  let product = new Product({
    //jika tidak pakai destructuring variable maka:
    // name: req.body.name,
    //dengan destruturing :
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  });

  product = await product.save();

  if (!product) {
    res.status(500).json({success: false});
  }
  res.send(product);
});

module.exports = router;
