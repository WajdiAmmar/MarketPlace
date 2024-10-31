// src/controllers/productController.js
const { firestore, storage } = require('../config/firebase'); // Assurez-vous d'importer Firestore et Storage
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { collection, addDoc, query, where, getDocs } = require('firebase/firestore'); // Ajoutez query, where et getDocs

// Fonction pour ajouter un produit
const addProduct = async (req, res) => {
  try {
    console.log("Requête reçue :", req.body); // Log le corps de la requête
    console.log("Fichier reçu :", req.file); // Log le fichier reçu
    
    const { title, price, category, condition, description } = req.body;
    const image = req.file; // Utilisé si tu as configuré multer pour gérer les images

    // Vérification des champs requis
    if (!title || !price || !category || !condition || !description) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    if (image) {
      // Référence à l'emplacement dans Firebase Storage
      const imageRef = ref(storage, `products/${image.originalname}`);

      // Télécharger l'image dans Firebase Storage
      await uploadBytes(imageRef, image.buffer);

      // Récupérer l'URL de l'image
      const imageUrl = await getDownloadURL(imageRef);

      // Créer le nouveau produit avec l'URL de l'image
      const newProduct = {
        title,
        price: parseFloat(price),
        category,
        condition,
        description,
        imageUrl,
        createdAt: new Date().toISOString(),
      };

      // Ajouter le produit à Firestore
      const docRef = await addDoc(collection(firestore, 'products'), newProduct);
      
      // Répondre avec les détails du produit ajouté
      return res.status(201).json({ id: docRef.id, ...newProduct });
    } else {
      return res.status(400).json({ message: "L'image est requise." });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    return res.status(500).json({ message: "Erreur lors de l'ajout du produit" });
  }
};

// Fonction pour obtenir les produits par catégorie
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    console.log("Catégorie reçue :", category); // Log de la catégorie reçue

    const productsRef = collection(firestore, 'products');
    const q = query(productsRef, where('category', '==', category));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log("Produits récupérés :", products); // Log des produits récupérés

    return res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des produits" });
  }
};

module.exports = { addProduct, getProductsByCategory };
