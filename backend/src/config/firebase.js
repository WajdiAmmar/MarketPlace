// src/config/firebase.js
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth'); // Importation de l'authentification

// Configuration de votre projet Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRIvWKqqmwPkIcAkCccvtlsGGiNOXZyB8",
  authDomain: "projet-paiement.firebaseapp.com",
  projectId: "projet-paiement",
  storageBucket: "projet-paiement.appspot.com",
  messagingSenderId: "1074856181393",
  appId: "1:1074856181393:web:de53591f2f2c9fea6d0930"
};

// Initialisation de Firebase
const firebase = initializeApp(firebaseConfig);

// Initialisation de Firestore
const firestore = getFirestore(firebase);

// Initialisation de Firebase Storage
const storage = getStorage(firebase);

// Initialisation de Firebase Authentication
const auth = getAuth(firebase); // Création de l'instance d'authentification

module.exports = { firebase, firestore, storage, auth }; // Exposez auth pour l'utiliser dans d'autres fichiers
