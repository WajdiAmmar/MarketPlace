require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const express = require('express');
const cors = require('cors');

// Importer les routes
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware CORS
app.use(cors({
  origin: process.env.ClientURL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAgeSeconds: 3600
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ajoutez cette ligne

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
