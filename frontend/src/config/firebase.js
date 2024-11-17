// Importation des fonctions nécessaires de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRIvWKqqmwPkIcAkCccvtlsGGiNOXZyB8",
  authDomain: "projet-paiement.firebaseapp.com",
  projectId: "projet-paiement",
  storageBucket: "projet-paiement.appspot.com",
  messagingSenderId: "1074856181393",
  appId: "1:1074856181393:web:de53591f2f2c9fea6d0930"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de l'authentification et Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Exporter l'auth, db, et la fonction AuthState
export { auth, db };
