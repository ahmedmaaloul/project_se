// routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/generate-invoice', invoiceController.generateInvoice);

module.exports = router;
