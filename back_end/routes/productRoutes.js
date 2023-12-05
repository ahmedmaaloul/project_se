const express = require('express');
const router = express.Router();
const { addProduct, updateProduct} = require('../controllers/productController'); // Import your controllers

router.post('/addProduct', addProduct);
router.post('/updateProduct', updateProduct);

module.exports = router;