// src/config/firebase.js

// Importation des modules nécessaires depuis le SDK Firebase
const { initializeApp } = require('firebase/app'); // Permet d'initialiser l'application Firebase
const { getStorage } = require('firebase/storage'); // Permet d'utiliser Firebase Storage pour stocker des fichiers
const { getFirestore } = require('firebase/firestore'); // Permet d'utiliser Firestore comme base de données
const { getAuth } = require('firebase/auth'); // Permet d'utiliser Firebase Authentication pour gérer les utilisateurs

// Configuration de votre projet Firebase
// Ces paramètres sont fournis lors de la configuration de votre projet sur la console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRIvWKqqmwPkIcAkCccvtlsGGiNOXZyB8", // Clé API pour accéder aux services Firebase
  authDomain: "projet-paiement.firebaseapp.com", // Domaine d'authentification pour les utilisateurs
  projectId: "projet-paiement", // Identifiant unique de votre projet Firebase
  storageBucket: "projet-paiement.appspot.com", // Emplacement du stockage Firebase
  messagingSenderId: "1074856181393", // Identifiant pour la messagerie Firebase Cloud Messaging
  appId: "1:1074856181393:web:de53591f2f2c9fea6d0930" // Identifiant unique pour l'application
};

// Initialisation de l'application Firebase avec la configuration ci-dessus
const firebase = initializeApp(firebaseConfig); // Création de l'instance principale de Firebase

// Initialisation de Firestore, la base de données cloud NoSQL de Firebase
const firestore = getFirestore(firebase); // Création d'une instance pour interagir avec Firestore

// Initialisation de Firebase Storage pour gérer le stockage de fichiers
const storage = getStorage(firebase); // Création d'une instance pour accéder au stockage cloud

// Initialisation de Firebase Authentication pour gérer les utilisateurs (connexion, inscription, etc.)
const auth = getAuth(firebase); // Création d'une instance pour gérer l'authentification des utilisateurs

// Exportation des instances Firebase, Firestore, Storage et Auth pour les utiliser dans d'autres parties de l'application
module.exports = { firebase, firestore, storage, auth };
