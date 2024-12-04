const { firestore } = require('../config/firebase');
const { collection, getDocs } = require('firebase/firestore');

// Fonction pour transformer un tableau d'objets en CSV
const arrayToCsv = (data) => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]); // Extraire les clés comme entêtes
  const rows = data.map(row => headers.map(header => `"${row[header] || ''}"`).join(',')); // Convertir les valeurs en lignes CSV
  
  return [headers.join(','), ...rows].join('\n'); // Concaténer les entêtes et les lignes
};

// Contrôleur pour récupérer toutes les collections et les envoyer au format CSV
const getAllCollectionsCsv = async (req, res) => {
  try {
    // Noms des collections à récupérer
    const collections = ['commandes', 'products', 'users'];
    let csvResponse = ''; // Initialisation d'une chaîne pour stocker le CSV final

    // Parcourir chaque collection
    for (const collectionName of collections) {
      const collectionRef = collection(firestore, collectionName);
      const snapshot = await getDocs(collectionRef);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Transformer les données de la collection en CSV
      const csvData = arrayToCsv(data);

      // Ajouter une séparation entre les collections (facultatif)
      csvResponse += `\n\n=== ${collectionName.toUpperCase()} ===\n${csvData}`;
    }

    // Envoyer toutes les données CSV dans la réponse HTTP
    res.setHeader('Content-Type', 'text/plain'); // Format texte brut pour inclure plusieurs sections
    res.send(csvResponse);
  } catch (error) {
    console.error('Erreur lors de la récupération des collections :', error);
    res.status(500).send('Erreur lors de la récupération des collections');
  }
};

module.exports = { getAllCollectionsCsv };
