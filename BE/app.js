const express = require("express");
const app = express();
require("dotenv/config");
const port = 3000;
// console.log(process.env);
const api = process.env.API_URL;

// http://localhost:3000/api/v1/products
app.get(`${api}/products`, (req, res) => {
  res.send(
    "Hello World!, Taufik anda adalah orang hebat, kamu bisa pasti jadi React Native Developer Expert"
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("panggil dari env:", api);
});
