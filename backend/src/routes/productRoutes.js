// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { addProduct, getProductsByCategory, getProductByProduct, getAllProducts } = require('../controllers/productController'); // Ajoutez getAllProducts
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route pour ajouter un produit
router.post('/add', upload.single('image'), addProduct);

// Route pour récupérer un produit spécifique par le champ 'Product'
router.get('/product/:Product', getProductByProduct);

// Route pour récupérer tous les produits par catégorie
router.get('/category/:category', getProductsByCategory);

// Route pour récupérer tous les produits
router.get('/products', getAllProducts); // Nouvelle route pour obtenir tous les produits

module.exports = router;
