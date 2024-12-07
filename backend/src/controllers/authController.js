// Importation des modules et services nécessaires
const { auth, firestore } = require('../config/firebase'); // Authentification et Firestore configurés dans Firebase
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth'); // Méthodes pour gérer l'inscription et la connexion
const { collection, addDoc, getDoc, setDoc, doc } = require('firebase/firestore'); // Méthodes pour manipuler les données dans Firestore
const jwt = require('jsonwebtoken'); // Importation de jwt pour la gestion des tokens JWT

// Fonction pour gérer l'inscription des utilisateurs
const signup = async (req, res) => {
  const { nom, prenom, genre, email, motDePasse } = req.body; // Extraction des données envoyées dans la requête HTTP

  try {
    // Étape 1 : Créer un utilisateur avec Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse); 
    const userId = userCredential.user.uid; // Récupération de l'UID de l'utilisateur créé

    // Étape 2 : Ajouter les informations de l'utilisateur dans Firestore
    await setDoc(doc(firestore, 'users', userId), {
      nom,         // Nom de l'utilisateur
      prenom,      // Prénom de l'utilisateur
      genre,       // Genre de l'utilisateur
      email,       // Email de l'utilisateur
      role: 'client', // Attribuer un rôle par défaut à l'utilisateur (ici "client")
    });
    console.log("Utilisateur ajouté à Firestore avec UID :", userId);

    // Répondre avec un statut 201 (Créé) et inclure l'UID de l'utilisateur
    res.status(201).json({ message: 'Inscription réussie !', uid: userId });
  } catch (error) {
    // Gestion des erreurs lors de l'inscription
    console.error("Erreur lors de l'inscription : ", error);
    res.status(400).json({ message: "Erreur lors de l'inscription. Veuillez réessayer." });
  }
};

// Clé secrète pour la signature des tokens JWT (récupérée depuis les variables d'environnement)
const JWT_SECRET = process.env.JWT_SECRET;

// Fonction pour gérer la connexion des utilisateurs
const signin = async (req, res) => {
  const { email, motDePasse } = req.body; // Extraction des données envoyées dans la requête HTTP
  console.log("Tentative de connexion avec :", email);

  try {
    // Étape 1 : Authentifier l'utilisateur avec Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
    const user = userCredential.user; // Récupérer les informations utilisateur depuis Firebase
    console.log("Utilisateur authentifié :", user.uid);

    // Étape 2 : Récupérer les informations utilisateur depuis Firestore
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (!userDoc.exists()) {
      throw new Error("Utilisateur introuvable dans Firestore."); // Lever une erreur si les données Firestore n'existent pas
    }

    const userData = userDoc.data(); // Récupérer les données de l'utilisateur
    console.log("Données de l'utilisateur dans Firestore :", userData);

    // Étape 3 : Générer un token JWT
    const token = jwt.sign(
      {
        uid: user.uid,        // ID de l'utilisateur
        email: user.email,    // Email de l'utilisateur
        role: userData.role,  // Rôle de l'utilisateur
      },
      JWT_SECRET,             // Clé secrète pour signer le token
      { expiresIn: '1h' }     // Durée de validité du token (1 heure)
    );

    // Répondre avec un statut 200 (Succès) et inclure le token et les données utilisateur
    res.status(200).json({
      token,
      user: {
        ID: user.uid,          // UID Firebase de l'utilisateur
        nom: userData.nom,     // Nom
        prenom: userData.prenom, // Prénom
        role: userData.role,   // Rôle
        genre: userData.genre, // Genre
        email: user.email,     // Email
      }
    });
  } catch (error) {
    // Gestion des erreurs lors de la connexion
    console.error("Erreur lors de la connexion :", error.message);
    res.status(401).json({ message: 'Erreur lors de la connexion. Vérifiez vos informations d\'identification.' });
  }
};

// Exportation des fonctions pour les utiliser dans d'autres fichiers
module.exports = { signup, signin };
