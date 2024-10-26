// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // Pour initialiser l'application Firebase
import { getAuth } from "firebase/auth"; // Pour l'authentification
import { getFirestore } from "firebase/firestore"; // Pour Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRIvWKqqmwPkIcAkCccvtlsGGiNOXZyB8",
  authDomain: "projet-paiement.firebaseapp.com",
  projectId: "projet-paiement",
  storageBucket: "projet-paiement.appspot.com",
  messagingSenderId: "1074856181393",
  appId: "1:1074856181393:web:de53591f2f2c9fea6d0930"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export the auth and db instances
export { auth, db };
