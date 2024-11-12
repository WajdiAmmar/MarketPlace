// src/controllers/productController.js
const { firestore, storage } = require('../config/firebase'); // Assurez-vous d'importer Firestore et Storage
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { collection, addDoc, query, where, getDocs } = require('firebase/firestore'); // Ajoutez getDoc si besoin

// Fonction pour ajouter un produit
const addProduct = async (req, res) => {
  try {
    console.log("Requête reçue :", req.body); // Log le corps de la requête
    console.log("Fichier reçu :", req.file); // Log le fichier reçu

    const { title, price, category, Product, condition, description, keywords } = req.body; 
    const image = req.file; // Utilisé si tu as configuré multer pour gérer les images

    // Vérification des champs requis
    if (!title || !price || !category || !Product || !condition || !description || !keywords) { 
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    if (image) {
      // Référence à l'emplacement dans Firebase Storage
      const imageRef = ref(storage, `products/${image.originalname}`);

      // Télécharger l'image dans Firebase Storage
      await uploadBytes(imageRef, image.buffer);

      // Récupérer l'URL de l'image
      const imageUrl = await getDownloadURL(imageRef);

      const keywordsArray = JSON.parse(keywords); 


      const newProduct = {
          title,
          price: parseFloat(price),
          category,
          Product,
          condition,
          description,
          imageUrl,
          keywords: keywordsArray, // Stocker les mots clés sous forme de tableau
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

// Fonction pour obtenir un produit par Product
const getProductByProduct = async (req, res) => {
  try {
    const productField = req.params.Product;
    console.log("Recherche de produits avec Product =", productField);

    const productsRef = collection(firestore, 'products');
    const q = query(productsRef, where('Product', '==', productField));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (products.length === 0) {
      console.log("Aucun produit trouvé pour Product =", productField);
      return res.status(404).json({ message: "Aucun produit trouvé." });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération du produit" });
  }
};

// Fonction pour obtenir les produits par catégorie
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    console.log("Catégorie reçue :", category);

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

const getAllProducts = async (req, res) => {
  try {
    console.log("Récupération de tous les produits.");

    const productsRef = collection(firestore, 'products');
    const querySnapshot = await getDocs(productsRef);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (products.length === 0) {
      console.log("Aucun produit trouvé.");
      return res.status(404).json({ message: "Aucun produit trouvé." });
    }

    console.log("Produits récupérés :", products); // Log des produits récupérés
    return res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des produits" });
  }
};

// Ajoutez cette fonction à l'exportation
module.exports = { addProduct, getProductByProduct, getProductsByCategory, getAllProducts };
