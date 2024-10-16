// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRIvWKqqmwPkIcAkCccvtlsGGiNOXZyB8",
  authDomain: "projet-paiement.firebaseapp.com",
  projectId: "projet-paiement",
  storageBucket: "projet-paiement.appspot.com",
  messagingSenderId: "1074856181393",
  appId: "1:1074856181393:web:de53591f2f2c9fea6d0930"
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase a été initialisé avec succès !"); // Log de succès

// Services Firebase
export const auth = getAuth(app);
console.log("Service d'authentification prêt !"); // Log pour Auth
export const db = getFirestore(app);
console.log("Service Firestore prêt !"); // Log pour Firestore

export default app;
