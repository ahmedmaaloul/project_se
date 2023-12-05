const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct, getProduct} = require('../controllers/productController'); 

router.post('/addProduct', addProduct);
router.post('/updateProduct', updateProduct);
router.post('/deleteProduct', deleteProduct);
router.post('/getProduct', getProduct);
module.exports = router;