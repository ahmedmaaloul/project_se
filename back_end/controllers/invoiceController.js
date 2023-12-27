// controllers/invoiceController.js
const PDFDocument = require('pdfkit');

exports.generateInvoice = async (req, res) => {
  const { cartItems } = req.body; // assuming cartItems is passed in the request

  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe the PDF into a user's file
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
  doc.pipe(res);

  // Add content to the PDF here using doc.text(), etc.
  doc.fontSize(25).text("ToutVente", { align: 'center' });
  doc.moveDown();
  doc.text('Invoice', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16)

  // List each cart item
  cartItems.forEach(item => {
    doc.text(`${item.product.label} - €${item.product.price.$numberDecimal} x ${item.quantity}`);
  });

  // Add total price
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.product.price.$numberDecimal), 0);
  doc.text(`Total Price: €${totalPrice.toFixed(2)}`, { align: 'right' });

  // Finalize the PDF
  doc.end();
};
