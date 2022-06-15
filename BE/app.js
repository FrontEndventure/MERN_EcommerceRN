const express = require('express');
const app = express();
require('dotenv/config');
const port = 3000;
// console.log(process.env);
const api = process.env.API_URL;
const morgan = require('morgan');
const mongoose = require('mongoose');

//midleware
app.use(express.json());
app.use(morgan('tiny'));

const productShema = mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', productShema);

// http://localhost:3000/api/v1/products
app.get(`${api}/products`, async (req, res) => {
  const productList = await Product.find();
  res.send(productList);
});

app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
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

mongoose
  .connect(process.env.CONNECTION_STRING_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database',
  })
  .then(() => {
    console.log('Database connected SUCCESS');
  })
  .catch(err => {
    console.log(err);
  });

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`);
  console.log('panggil dari env:', api);
});
