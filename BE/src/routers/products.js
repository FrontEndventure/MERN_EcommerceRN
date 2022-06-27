import express from 'express';
const router = express.Router();

// http://localhost:3000/api/v1/products
const {Product} = require('../models/product');

router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  if (!productList) {
    res.status(500).json({success: false});
  }
  res.send(productList);
});

router.post(`/`, (req, res) => {
  //pake destructuring variable
  const {name, image, countInStock} = req.body;
  const product = new Product({
    //jika tidak pakai destructuring variable maka:
    // name: req.body.name,
    //dengan destruturing :
    name,
    image,
    countInStock,
  });

  product
    .save()
    .then(createdProduct => {
      res.status(201).json(createdProduct);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
  // res.send(newProduct);
});

module.exports = router;
