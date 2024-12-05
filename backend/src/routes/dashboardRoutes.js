const express = require('express');
const { getCommandes, getProducts, generateEmbedToken } = require('../controllers/dashboardController');
const router = express.Router();

// Route pour récupérer les commandes
router.get('/commandes', getCommandes);

// Route pour récupérer les produits
router.get('/products', getProducts);

// Route pour générer le token Power BI
router.post('/generate-embed-token', generateEmbedToken);

module.exports = router;
