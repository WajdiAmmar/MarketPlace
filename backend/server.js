require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Importer cookie-parser

const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware pour parser les cookies
app.use(cookieParser()); // Ajout du middleware pour gérer les cookies

// Middleware CORS
app.use(cors({
  origin: process.env.ClientURL || 'http://localhost:3000', // Ajouter votre URL de client en production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Autoriser les cookies pour CORS
  maxAge: 3600
}));

// Middleware pour gérer le parsing des corps de requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour définir un cookie avec SameSite=None et Secure
app.use((req, res, next) => {
  // Définir un cookie de test avec SameSite=None et Secure
  res.cookie('cookietest', 'value', {
    httpOnly: true,  // Le cookie ne peut pas être accédé par JavaScript
    secure: process.env.NODE_ENV === 'production', // Le cookie sera sécurisé en production (https)
    sameSite: 'None', // Permet les cookies inter-domaines
    maxAge: 3600 * 1000, // Expiration d'une heure (en millisecondes)
  });
  next();
});

// Définition des routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Lancer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Client URL:', process.env.ClientURL); // Vérifiez que la variable est bien chargée
});
