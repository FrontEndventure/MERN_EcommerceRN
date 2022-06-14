const express = require('express');
const app = express();
require('dotenv/config');
const port = 3000;
// console.log(process.env);
const api = process.env.API_URL;

//midleware
app.use(express.json());

// http://localhost:3000/api/v1/products
app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'hair dress',
    image: 'some_url',
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(newProduct);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log('panggil dari env:', api);
});
