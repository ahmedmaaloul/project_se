const express = require("express");
const router = express.Router();
const productController  = require("../controllers/productController");
const upload = require("../middleware/multer");


router.get('/', productController.getProducts);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/:id', productController.getProductById);

module.exports = router;
