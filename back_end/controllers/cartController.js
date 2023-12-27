// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addItemToCart = async (req, res) => {
    const userId = req.userId;  // Assuming userId is set correctly in the request
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
            await cart.save();
        }

        let itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Increment quantity of existing item
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Push new item
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send("Error updating cart");
    }
};

exports.removeItemFromCart = async (req, res) => {
    const userId = req.userId;  // Assuming userId is set correctly in the request
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).send("Error updating cart");
    }
};

exports.getUserCart = async (req, res) => {
    const userId = req.userId;  // Assuming userId is set correctly in the request

    try {
        let cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching or creating cart:', error);
        res.status(500).send("Error fetching or creating cart");
    }
};

// controllers/cartController.js
exports.updateQuantity = async (req, res) => {
    const {_,productId, quantity } = req.body;
    const userId = req.userId
  
    try {
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).send("Cart not found");
      }
  
      let itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).send("Item not found in cart");
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      res.status(500).send("Error updating cart quantity");
    }
  };
  
  exports.clearCart = async (req, res) => {
    const userId = req.userId; // Extract user ID from request
  
    try {
      await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });
      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).send("Error clearing cart");
    }
  };
