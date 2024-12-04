const express = require('express');
const { getCommandes } = require('../controllers/dashboardController');
const router = express.Router();

// Route pour récupérer les commandes
router.get('/commandes', getCommandes);

module.exports = router;
