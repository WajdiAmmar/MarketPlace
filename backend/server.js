require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env
const express = require('express');
const cors = require('cors');

// Importer les routes
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware CORS (simplifié pour les tests)
app.use(cors()); // Permet toutes les origines pour tester

// Middleware JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
