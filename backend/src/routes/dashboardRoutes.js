const express = require('express');
const { getCommandes, getProducts } = require('../controllers/dashboardController');
const router = express.Router();

// Route pour récupérer les commandes
router.get('/commandes', getCommandes);

// Route pour récupérer les produits
router.get('/products', getProducts);

module.exports = router;
