import mongoose from 'mongoose';


const productShema = mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    image: String,
    countInStock: {
      type: Number,
      required: true,
    },
  });
  
  exports.Product = mongoose.model('Product', productShema);
  // module.exports = mongoose.model('Product', productShema);