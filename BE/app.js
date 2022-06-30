//using babel can import without require
import morgan from 'morgan';
import mongoose from 'mongoose';
import express from 'express';
const app = express();
import cors from 'cors';

import 'dotenv/config';
// const cors = require('cors');

app.use(cors());
app.options('*', cors());
const port = 3000;
const api = process.env.API_URL;

// Router address
const categoriesRoutes = require('./src/routers/categories');
const productsRouter = require('./src/routers/products');
const usersRoutes = require('./src/routers/users');
const orderRoutes = require('./src/routers/orders');

//midleware
app.use(express.json());
app.use(morgan('tiny'));

//router
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, orderRoutes);

// database
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

//server
app.listen(port, () => {
  console.log('panggil dari env:', api);
});
