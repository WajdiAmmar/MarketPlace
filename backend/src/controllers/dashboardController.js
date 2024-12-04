const { firestore } = require('../config/firebase');
const { collection, getDocs } = require('firebase/firestore');

// Fonction pour transformer un tableau d'objets en CSV
const arrayToCsv = (data) => {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]); // Extraire les clés comme entêtes
  const rows = data.map(row => headers.map(header => `"${row[header] || ''}"`).join(',')); // Convertir les valeurs en lignes CSV

  return [headers.join(','), ...rows].join('\n'); // Concaténer les entêtes et les lignes
};

// Fonction pour transformer le champ `products` en JSON lisible
const processOrdersData = (data) => {
  return data.map(order => ({
    ...order,
    products: JSON.stringify(order.products || []), // Convertir les produits en chaîne JSON
  }));
};

// Contrôleur pour récupérer toutes les commandes et les envoyer au format CSV
const getCommandes = async (req, res) => {
  try {
    const commandesRef = collection(firestore, 'commandes');
    const snapshot = await getDocs(commandesRef);

    // Mapper les données des commandes
    const commandes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Traiter les données pour rendre `products` lisible
    const processedCommandes = processOrdersData(commandes);

    // Transformer les données en CSV
    const csvData = arrayToCsv(processedCommandes);

    // Envoyer les données CSV dans la réponse HTTP en tant que texte brut
    res.setHeader('Content-Type', 'text/plain');
    res.send(csvData);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).send('Erreur lors de la récupération des commandes');
  }
};

module.exports = { getCommandes };
