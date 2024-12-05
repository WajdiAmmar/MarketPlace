const { firestore } = require('../config/firebase');
const { collection, getDocs } = require('firebase/firestore');

// Fonction pour transformer un tableau d'objets en CSV
const arrayToCsv = (data) => {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]); // Extraire les clés comme entêtes
  const rows = data.map(row => headers.map(header => `"${row[header] || ''}"`).join(',')); // Convertir les valeurs en lignes CSV

  return [headers.join(','), ...rows].join('\n'); // Concaténer les entêtes et les lignes
};

// Fonction pour formater le champ `products`
const formatProducts = (products) => {
  if (!Array.isArray(products)) return ''; // Si ce n'est pas un tableau, retourner une chaîne vide
  return products.map(p => `${p.Product}${p.category}${p.price}${p.quantity}`).join('; '); // Exemple: "Product1 (x2); Product2 (x1)"
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
      products: formatProducts(doc.data().products || []), // Formater le champ `products`
    }));

    // Transformer les données en CSV
    const csvData = arrayToCsv(commandes);

    // Envoyer les données CSV dans la réponse HTTP
    res.setHeader('Content-Type', 'text/plain');
    res.send(csvData);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).send('Erreur lors de la récupération des commandes');
  }
};

module.exports = { getCommandes };
