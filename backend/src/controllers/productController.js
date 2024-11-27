// src/controllers/productController.js
const { firestore, storage } = require('../config/firebase'); // Assurez-vous d'importer Firestore et Storage
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { collection, addDoc, query, where, getDocs,doc,deleteDoc, updateDoc, getDoc} = require('firebase/firestore'); // Ajoutez getDoc si besoin

// Fonction pour ajouter un produit
const addProduct = async (req, res) => {
  try {
    const { title, price, category, Product, condition, description, keywords, quantity, userId } = req.body; 
    const image = req.file;

    // Vérification des champs requis
    if (!title || !price || !category || !Product || !condition || !description || !keywords || !quantity) {
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
          quantity: parseInt(quantity), // La quantité est convertie en nombre entier
          imageUrl,
          keywords: keywordsArray,
          userId,
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
const getProductsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Récupération des produits pour l'utilisateur :", userId);

    if (!userId) {
      return res.status(400).json({ message: "ID utilisateur manquant." });
    }

    const productsRef = collection(firestore, 'products');
    const q = query(productsRef, where('userId', '==', userId));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (products.length === 0) {
      console.log("Aucun produit trouvé pour cet utilisateur.");
      return res.status(404).json({ message: "Aucun produit trouvé." });
    }

    console.log("Produits récupérés :", products);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return res.status(500).json({ message: "Erreur serveur lors de la récupération des produits." });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId; // Récupérer l'ID du produit à partir de l'URL

    if (!productId) {
      return res.status(400).json({ message: "ID du produit manquant." });
    }

    // Référence au produit dans Firestore
    const productRef = doc(firestore, 'products', productId);

    // Supprimer le produit de Firestore
    await deleteDoc(productRef);

    // Répondre avec succès
    return res.status(200).json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression du produit" });
  }
};


const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { title, price, description, quantity } = req.body;
    const image = req.file; // Nouvelle image si elle existe

    if (!productId) {
      return res.status(400).json({ message: "ID du produit manquant." });
    }

    const productRef = doc(firestore, 'products', productId);
    const updatedData = { title, price: parseFloat(price), description, quantity: parseInt(quantity, 10) };

    // Si une nouvelle image est fournie, mettez-la à jour dans Firebase Storage
    if (image) {
      const imageRef = ref(storage, `products/${image.originalname}`);
      await uploadBytes(imageRef, image.buffer);
      const imageUrl = await getDownloadURL(imageRef);
      updatedData.imageUrl = imageUrl; // Met à jour l'URL de l'image
    }

    // Mise à jour du produit dans Firestore
    await updateDoc(productRef, updatedData);

    return res.status(200).json({ message: "Produit mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour du produit." });
  }
};

// Fonction pour récupérer un produit par ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!productId) {
      return res.status(400).json({ message: "ID du produit manquant." });
    }

    const productRef = doc(firestore, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    return res.status(200).json({ id: productSnapshot.id, ...productSnapshot.data() });
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    return res.status(500).json({ message: "Erreur serveur lors de la récupération du produit." });
  }
};


// Ajoutez cette fonction à l'exportation
module.exports = { addProduct,getProductByProduct,getProductById, getProductsByCategory, getAllProducts,getProductsByUser,deleteProduct, updateProduct };
