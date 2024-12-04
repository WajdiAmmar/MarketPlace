const express = require('express');
const { getAllCollectionsCsv } = require('../controllers/dashboardController');
const router = express.Router();

// Route pour récupérer les commandes
router.get('/csv', getAllCollectionsCsv);

module.exports = router;
