const { firestore } = require('../config/firebase');
const { collection, getDocs } = require('firebase/firestore');

const POWER_BI_API_URL = 'https://api.powerbi.com/v1.0/myorg/groups';
const TOKEN = process.env.POWER_BI_TOKEN; 

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
  
  return products
    .map(p => `${p.id}`) // Séparer chaque champ par ";"
    .join('; '); // Séparer chaque produit par "; "
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
// Contrôleur pour récupérer les produits et les envoyer au format CSV
const getProducts = async (req, res) => {
  try {
    const productsRef = collection(firestore, 'products');
    const snapshot = await getDocs(productsRef);

    // Mapper les données des produits
    const products = snapshot.docs.map(doc => ({
      id: doc.id, // Inclure l'ID du document
      Product: doc.data().Product || '', // Extraire le champ Product
      category: doc.data().category || '', // Extraire le champ category
      price: doc.data().price || '', // Extraire le champ price
      quantity: doc.data().quantity || '', // Extraire le champ quantity
      date : doc.data().createdAt|| '',
    }));

    // Transformer les données en CSV
    const csvData = arrayToCsv(products);

    // Envoyer les données CSV dans la réponse HTTP
    res.setHeader('Content-Type', 'text/plain');
    res.send(csvData);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).send('Erreur lors de la récupération des produits');
  }
};
// Contrôleur pour générer le token Power BI
const generateEmbedToken = async (req, res) => {
  const { groupId, reportId } = req.body;

  if (!groupId || !reportId) {
    return res.status(400).json({ error: 'Group ID et Report ID sont requis' });
  }

  try {
    const response = await fetch(`${POWER_BI_API_URL}/${groupId}/reports/${reportId}/GenerateToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ accessLevel: 'view' }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: 'Erreur lors de la génération du token', details: errorData });
    }

    const data = await response.json();
    res.status(200).json({ token: data.token });
  } catch (error) {
    console.error('Erreur lors de la génération du token :', error);
    res.status(500).send('Erreur interne du serveur');
  }
};

module.exports = { getCommandes ,getProducts,generateEmbedToken };
