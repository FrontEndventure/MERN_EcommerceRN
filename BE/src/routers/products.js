import express from 'express';
import {Category} from '../models/category';
const router = express.Router();
const monggose = require('mongoose');

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
  if (!monggose.isValidObjectId(req.params.id)) {
    res.status(400).send('invalid Product Id');
  }
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

router.put(`/:id`, async (req, res) => {
  if (!monggose.isValidObjectId(req.params.id)) {
    res.status(400).send('invalid Product Id');
  }

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

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
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
    },
    {new: true},
  );

  if (!product) {
    res.status(500).json({success: false});
  }
  res.send(product);
});

//api/v1/id
router.delete('/:id', (req, res) => {
  if (!monggose.isValidObjectId(req.params.id)) {
    res.status(400).send('invalid Product Id');
  } else {
    Product.findByIdAndRemove(req.params.id)
      .then(product => {
        if (product) {
          return res.status(200).json({
            success: true,
            message: 'product deleted',
          });
        } else {
          return res
            .status(404)
            .json({success: false, message: 'product not found'});
        }
      })
      .catch(err => {
        return res.status(400).json({success: false, error: err});
      });
  }
});

router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments(count => count).clone();

  if (!productCount) {
    res.status(500).json({success: false});
  }
  res.send({
    jumlahProduk: productCount,
  });
});

router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  // const products = await Product.find({ isFeatured: true }).limit(+count);
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
      res.status(500).json({ success: false });
  }
  res.send(products);
});

module.exports = router;
