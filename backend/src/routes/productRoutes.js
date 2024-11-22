// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { addProduct, getProductsByCategory,getProductById, getProductByProduct, getAllProducts,getProductsByUser,deleteProduct,updateProduct } = require('../controllers/productController'); // Ajoutez getAllProducts
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route pour ajouter un produit
router.post('/add', upload.single('image'), addProduct);

// Route pour récupérer un produit spécifique par le champ 'Product'
router.get('/product/:Product', getProductByProduct);
// Route pour récupérer un produit par ID
router.get('/products/:productId', getProductById);

// Route pour récupérer tous les produits par catégorie
router.get('/category/:category', getProductsByCategory);

// Route pour récupérer tous les produits
router.get('/products', getAllProducts); 

// Route pour récupérer les produits par utilisateur
router.get('/user/:userId', getProductsByUser);

router.delete('/products/:productId',deleteProduct);
  
router.put('/products/:productId', upload.single('image'), updateProduct);

module.exports = router;
