const { firestore } = require('../config/firebase');
const { collection, getDocs } = require('firebase/firestore');

const getCommandes = async (req, res) => {
  try {
    const commandesRef = collection(firestore, 'commandes');
    const snapshot = await getDocs(commandesRef);

    const commandes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.setHeader('Content-Type', 'application/json');
    res.json(commandes); 
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).send('Erreur lors de la récupération des commandes');
  }
};

module.exports = { getCommandes };
