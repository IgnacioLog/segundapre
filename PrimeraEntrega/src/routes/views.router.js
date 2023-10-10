const express = require('express');
const router = express.Router();
const ProductManager = require('../classes/ProductManager');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

module.exports = router;
