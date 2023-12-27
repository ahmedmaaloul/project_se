const Product = require("../models/Product");
const upload = require("../middleware/multer");
const Cart = require('../models/Cart');


// Get all products
exports.getProducts = async (req, res) => {
  try {
      let query = {};
      if (req.query.search) {
          query.label = { $regex: req.query.search, $options: 'i' }; // 'i' for case insensitive
      }

      const products = await Product.find(query);
      res.json(products);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send("Error fetching products");
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { label, description, price } = req.body;
    const update = { label, description, price };

    // If there's a new image, update the image path
    if (req.file) {
      update.image = req.file.filename; // Update only with filename
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a product

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete the product
    await Product.findByIdAndDelete(productId);

    // Find and update all carts that contain the deleted product
    const carts = await Cart.find({ 'items.product': productId });
    for (let cart of carts) {
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      await cart.save();
    }

    res.json({ message: 'Product deleted successfully and removed from carts' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send(error.message);
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { label, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = new Product({
      label,
      description,
      price,
      image
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};