// Importation des fonctions nécessaires de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Importer les actions login et logout
import { login, logout } from '../actions/authActions';  // Assurez-vous que le chemin est correct

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

// Fonction pour écouter les changements d'état de l'utilisateur authentifié
const AuthState = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Si l'utilisateur est connecté, récupérer le token
      user.getIdToken().then((token) => {
        dispatch(login(token, user));  // Appel de l'action login
      });
    } else {
      dispatch(logout());  // Appel de l'action logout
    }
  });
};

// Exporter l'auth, db, et la fonction AuthState
export { auth, db, AuthState };
