const { firestore } = require('../config/firebase');
const { collection, getDocs } = require('firebase/firestore');

// Fonction pour transformer un tableau d'objets en CSV
const arrayToCsv = (data) => {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]); // Extraire les clés comme entêtes
  const rows = data.map(row => headers.map(header => `"${row[header] || ''}"`).join(',')); // Convertir les valeurs en lignes CSV

  return [headers.join(','), ...rows].join('\n'); // Concaténer les entêtes et les lignes
};

// Contrôleur pour récupérer toutes les commandes et les envoyer au format CSV
const getCommandes = async (req, res) => {
  try {
    const commandesRef = collection(firestore, 'commandes');
    const snapshot = await getDocs(commandesRef);

    const commandes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Transformer les données en CSV
    const csvData = arrayToCsv(commandes);

    // Envoyer les données CSV dans la réponse HTTP en tant que texte brut
    res.setHeader('Content-Type', 'text/plain')
    res.send(csvData);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).send('Erreur lors de la récupération des commandes');
  }
};

module.exports = { getCommandes };
