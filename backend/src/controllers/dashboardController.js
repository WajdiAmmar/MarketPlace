const { firestore} = require('../config/firebase'); // Assurez-vous d'importer Firestore et Storage
const { collection, getDocs} = require('firebase/firestore'); // Ajoutez getDoc si besoin

// Contrôleur pour récupérer toutes les commandes
const getCommandes = async (req, res) => {
  try {
    const commandesRef = collection(firestore, 'commandes');
    const snapshot = await getDocs(commandesRef);
    const commandes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(commandes);  // Retourne les commandes sous forme de JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes : ", error);
    res.status(500).send('Erreur lors de la récupération des commandes');
  }
};

module.exports = { getCommandes };
