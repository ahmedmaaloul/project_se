const User = require('../models/user');
const Wishlist = require('../models/wishlist');

// add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // find user with userId
    const user = await User.findById(userId);

    // add the product
    user.wishlist.push({ product: productId });
    await user.save();

    res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// delete product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    user.wishlist = user.wishlist.filter(item => item.product.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get user wishlist
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findById(userId).populate('wishlist.product');

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
