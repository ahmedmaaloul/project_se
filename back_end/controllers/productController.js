const Product = require('../models/product');

const addProduct = async (req, res) => {
    try {
      const { id, label, description, price, seller } = req.body;

      const newProduct = new Product({
        id,
        label,
        description,
        price,
        seller
      });

      const savedProduct = await newProduct.save();
  
      res.status(201).json(savedProduct); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const productId = req.params.id; 
      const { label, description, price, seller } = req.body; 
      
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }
      product.label = label || product.label;
      product.description = description || product.description;
      product.price = price || product.price;
      product.seller = seller || product.seller;

      const updatedProduct = await product.save();
  
      res.json(updatedProduct); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id; 
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }
  
      res.json({ message: 'Produit supprimé avec succès', deletedProduct });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getProduct = async (req, res) => {
    try {
      //if no input for id AND label => return all items
      const { id, label } = req.query;
  
      if (id) {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: 'Produit non trouvé' });
        }
        return res.json(product);
      } else if (label) {
        const product = await Product.findOne({ label });
        if (!product) {
          return res.status(404).json({ message: 'Produit non trouvé' });
        }
        return res.json(product);
      } else {
        const products = await Product.find();
        res.json(products);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct
  };
  