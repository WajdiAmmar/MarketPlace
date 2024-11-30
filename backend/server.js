require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const confirmOrderRoutes = require('./src/routes/confirmOrderRoute');

const app = express();

// Liste des origines autorisées
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000', // Localhost pour développement
  'https://projet-paiement.web.app', // URL Firebase en production
];

// Configuration CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origine non autorisée par les règles CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true, // Autoriser les cookies
}));


// Middleware pour le parsing des requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/confirmOrder', confirmOrderRoutes);
app.use('/api/cart', cartRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur détectée :', err.stack);
  res.status(500).json({ error: 'Une erreur est survenue sur le serveur.' });
});

// Lancer le serveur
const port = process.env.BASE_URL || "https://marketplace-happyshop.up.railway.app/";
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur ${port}`);
});
