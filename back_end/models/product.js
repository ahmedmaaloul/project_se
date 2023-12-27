const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  image: {
    type: String
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
