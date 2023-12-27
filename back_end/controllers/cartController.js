// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // Assuming you have a Product model

exports.addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        let itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            item.quantity += quantity;
            cart.items[itemIndex] = item;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send("Error updating cart");
    }
};

exports.removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        // Remove item from cart
        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send("Error updating cart");
    }
};

exports.getUserCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send("Error fetching cart");
    }
};
