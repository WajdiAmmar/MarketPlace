// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { addProduct, getProductsByCategory } = require('../controllers/productController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route pour ajouter un produit
router.post('/add', upload.single('image'), addProduct);

router.get('/category/:category', getProductsByCategory);

module.exports = router;
