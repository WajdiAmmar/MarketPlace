// routes/users.js

const express = require('express');
const router = express.Router();

// Route d'inscription
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Ici, vous ajouterez la logique pour enregistrer l'utilisateur dans la base de données
  res.send('Utilisateur enregistré');
});

// Route de connexion
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Ici, vous ajouterez la logique pour vérifier l'utilisateur
  res.send('Utilisateur connecté');
});

module.exports = router;
