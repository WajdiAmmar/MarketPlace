const { auth, firestore } = require('../config/firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { collection, addDoc, getDoc, setDoc, doc } = require('firebase/firestore');
const jwt = require('jsonwebtoken'); // Import de jwt

const signup = async (req, res) => {
  const { nom, prenom, genre, email, motDePasse } = req.body;

  try {
    // Créer un utilisateur avec Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
    const userId = userCredential.user.uid;

    // Ajouter l'utilisateur dans Firestore en utilisant l'UID comme ID de document
    await setDoc(doc(firestore, 'users', userId), {
      nom,
      prenom,
      genre,
      email,
      role: 'client',
    });
    console.log("Utilisateur ajouté à Firestore avec UID :", userId);

    res.status(201).json({ message: 'Inscription réussie !', uid: userId });
  } catch (error) {
    console.error("Erreur lors de l'inscription : ", error);
    res.status(400).json({ message: "Erreur lors de l'inscription. Veuillez réessayer." });
  }
};



const JWT_SECRET = process.env.JWT_SECRET || '4b15bd0e5769471e9e4c56180fdec52a6c661dd35fa192a461d32c4a7da663730003f26dddf36c843fa219c63daefe42d7c85f1d3863051dd1b64a64f3fbd571';

const signin = async (req, res) => {
  const { email, motDePasse } = req.body;
  console.log("Tentative de connexion avec :", email);

  try {
    // Authentification avec Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
    const user = userCredential.user;
    console.log("Utilisateur authentifié :", user.uid);

    // Récupérer les données de l'utilisateur dans Firestore
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (!userDoc.exists()) {
      throw new Error("Utilisateur introuvable dans Firestore.");
    }

    const userData = userDoc.data();
    console.log("Données de l'utilisateur dans Firestore :", userData);

    // Générer un token JWT
    const token = jwt.sign(
      { uid: user.uid, email: user.email, role: userData.role },
      JWT_SECRET,  
      { expiresIn: '24h' }  
    );

    // Réponse avec le token JWT
    res.status(200).json({
      token,  // Renvoi du token au client
      message: 'Connexion réussie !'
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    res.status(401).json({ message: 'Erreur lors de la connexion. Vérifiez vos informations d\'identification.' });
  }
};

module.exports = { signup, signin };
