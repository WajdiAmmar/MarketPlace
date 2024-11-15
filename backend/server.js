require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 


const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const confirmOrderRoutes = require('./src/routes/confirmOrderRoute'); 

const app = express();

// Middleware pour parser les cookies
app.use(cookieParser());

// Middleware CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
  maxAge: 3600
}));

// Middleware pour gérer le parsing des corps de requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Définition des routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', confirmOrderRoutes); 

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur est survenue sur le serveur.' });
});

// Lancer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
