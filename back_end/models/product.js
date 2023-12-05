const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    label: { //name of the product
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;