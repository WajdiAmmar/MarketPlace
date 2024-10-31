// src/controllers/authController.js
const { auth, firestore } = require('../config/firebase'); // Assurez-vous d'importer Firebase
const { createUserWithEmailAndPassword,signInWithEmailAndPassword } = require('firebase/auth');
const { collection, addDoc } = require('firebase/firestore');


const signup = async (req, res) => {
  const { nom, prenom, genre, email, motDePasse } = req.body;

  try {
    // Créer un utilisateur avec Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
    
    // Vérifier si l'utilisateur est bien créé
    console.log("Utilisateur créé avec succès :", userCredential.user);

    // Ajouter l'utilisateur dans la base Firestore
    const userDocRef = await addDoc(collection(firestore, 'users'), {
      uid: userCredential.user.uid,
      nom,
      prenom,
      genre,
      email,
    });

    console.log("Utilisateur ajouté à Firestore avec ID :", userDocRef.id);

    // Répondre avec un message de succès
    res.status(201).json({ message: 'Inscription réussie !', uid: userCredential.user.uid });
  } catch (error) {
    console.error('Erreur lors de l\'inscription : ', error);
    res.status(400).json({ message: 'Erreur lors de l\'inscription. Veuillez réessayer.' });
  }
};
const signin = async (req, res) => {
  const { email, motDePasse } = req.body; // Assurez-vous que ces champs sont envoyés dans la requête
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
      const user = userCredential.user;

      // Répondez avec les informations utilisateur nécessaires (vous pouvez personnaliser cela)
      res.status(200).json({
          uid: user.uid,
          email: user.email,
          message: 'Connexion réussie !',
      });
  } catch (error) {
      console.error('Erreur lors de la connexion : ', error);
      res.status(401).json({ message: 'Erreur lors de la connexion. Vérifiez vos informations d\'identification.' });
  }
};

module.exports = { signup, signin };
