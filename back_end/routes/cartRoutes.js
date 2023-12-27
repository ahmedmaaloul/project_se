// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

router.post('/add',verifyToken, cartController.addItemToCart);
router.post('/remove',verifyToken, cartController.removeItemFromCart);
router.get('/my',verifyToken, cartController.getUserCart);
router.post('/update-quantity', verifyToken, cartController.updateQuantity);
router.post('/clear', verifyToken, cartController.clearCart);

module.exports = router;
