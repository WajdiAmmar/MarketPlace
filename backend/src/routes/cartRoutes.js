const express = require('express');
const { addToCart, getCart, removeFromCart,updateQuantity } = require('../controllers/cartController');

const router = express.Router();

// Ajouter un produit au panier
router.post('/add', addToCart);

// Récupérer les produits du panier
router.get('/cart/:userId', getCart);

// Supprimer un produit du panier
router.delete('/remove', removeFromCart);

// Mettre à jour la quantité d'un produit dans le panier
router.put('/update-quantity', updateQuantity);


module.exports = router;
