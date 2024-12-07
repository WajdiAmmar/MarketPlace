// Charger les variables d'environnement
require('dotenv').config();

// Importation des dépendances nécessaires
const express = require('express');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes'); // Routes pour les produits
const authRoutes = require('./src/routes/authRoutes'); // Routes pour l'authentification
const cartRoutes = require('./src/routes/cartRoutes'); // Routes pour le panier
const confirmOrderRoutes = require('./src/routes/confirmOrderRoute'); // Routes pour la confirmation des commandes
const dashboardRoutes = require('./src/routes/dashboardRoutes'); // Routes pour le tableau de bord

// Initialisation de l'application Express
const app = express();

// Liste des origines autorisées pour les requêtes CORS
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000', // URL de développement par défaut (localhost)
  'https://projet-paiement.web.app', // URL de l'application Firebase en production
  'https://app.powerbi.com' // URL pour autoriser les appels depuis Power BI Service
];

// Configuration du middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin === 'https://app.powerbi.com') {
      callback(null, true); // Si l'origine est autorisée, on permet la requête
    } else {
      callback(new Error('Origine non autorisée par les règles CORS')); // Sinon, on renvoie une erreur
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés pour les requêtes
  credentials: true, // Autoriser les cookies pour les requêtes cross-origin
}));

// Middleware pour le parsing des requêtes JSON et URL-encoded
app.use(express.json()); // Permet de parser les corps de requêtes JSON
app.use(express.urlencoded({ extended: true })); // Permet de parser les corps de requêtes encodés en URL

// Définition des routes de l'API
app.use('/api/products', productRoutes); // Routes pour les produits
app.use('/api/auth', authRoutes); // Routes pour l'authentification
app.use('/api/confirmOrder', confirmOrderRoutes); // Routes pour la confirmation des commandes
app.use('/api/cart', cartRoutes); // Routes pour gérer le panier
app.use('/api/dashboard', dashboardRoutes); // Routes pour le tableau de bord (admin)

// Middleware pour gérer les erreurs serveur
app.use((err, req, res, next) => {
  console.error('Erreur détectée :', err.stack); // Affichage des erreurs dans la console
  res.status(500).json({ error: 'Une erreur est survenue sur le serveur.' }); // Réponse d'erreur au client
});

// Démarrage du serveur sur le port spécifié
const port = process.env.PORT || 5000; // Le port est défini par une variable d'environnement, sinon par défaut 5000
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur http://localhost:${port}`); // Affiche un message lorsque le serveur démarre
});
