const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product', 
    required: true,
  },
});

const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user', 
      required: true,
    },
    items: [wishlistItemSchema],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
