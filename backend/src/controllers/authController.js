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

const JWT_SECRET = process.env.JWT_SECRET;

const signin = async (req, res) => {
  const { email, motDePasse } = req.body;
  console.log("Tentative de connexion avec :", email);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
    const user = userCredential.user;
    console.log("Utilisateur authentifié :", user.uid);

    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (!userDoc.exists()) {
      throw new Error("Utilisateur introuvable dans Firestore.");
    }

    const userData = userDoc.data();
    console.log("Données de l'utilisateur dans Firestore :", userData);

    const token = jwt.sign(
      { uid: user.uid, email: user.email, role: userData.role, },
      JWT_SECRET,  
      { expiresIn: '1h' }  
    );

    // Inclure les données utilisateur dans la réponse
    res.status(200).json({
      token,
      user: {
        ID: user.uid,
        nom: userData.nom,
        prenom: userData.prenom,
        role: userData.role,
        genre: userData.genre,
        email: user.email,
        }
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    res.status(401).json({ message: 'Erreur lors de la connexion. Vérifiez vos informations d\'identification.' });
  }
};

module.exports = { signup, signin };
