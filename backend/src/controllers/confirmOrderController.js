const { doc, getDoc, setDoc, writeBatch, collection, addDoc } = require('firebase/firestore');
const { firestore } = require('../config/firebase');
const nodemailer = require('nodemailer');

// Fonction pour confirmer la commande
const confirmation = async (req, res) => {
  try {
    // Récupération des données envoyées dans la requête
    const { formData, userId } = req.body;

    // Vérification que les données nécessaires sont présentes
    if (!formData || !formData.email || !formData.fullName || !userId) {
      return res.status(400).json({ message: 'Données de commande ou utilisateur manquantes.' });
    }

    // Référence du panier de l'utilisateur dans Firestore
    const cartRef = doc(firestore, 'Panier', userId);
    const cartDoc = await getDoc(cartRef);

    // Vérification si le panier existe
    if (!cartDoc.exists()) {
      return res.status(404).json({ message: 'Panier introuvable.' });
    }

    // Récupération des données du panier
    const cartData = cartDoc.data();
    const productsInCart = Array.isArray(cartData.products) ? cartData.products : [];

    // Vérification si le panier est vide
    if (productsInCart.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide.' });
    }

    // Initialisation du lot d'écriture Firestore pour les mises à jour en batch
    const updateBatch = writeBatch(firestore);
    const insufficientStock = [];  // Liste des produits avec un stock insuffisant
    let totalAmount = 0; // Initialisation du total de la commande

    // Traitement des produits dans le panier
    const productDetails = productsInCart.map(item => {
      const productRef = doc(firestore, 'products', item.id);
      
      // Récupération des informations sur chaque produit
      return getDoc(productRef).then(productDoc => {
        if (!productDoc.exists()) {
          insufficientStock.push(`Produit non trouvé pour l'ID ${item.id}`);
          return null; // Si le produit n'existe pas, l'ignorer
        }

        const productData = productDoc.data();
        const newQuantity = productData.quantity - item.quantity;

        // Vérification de la disponibilité du stock
        if (newQuantity < 0) {
          insufficientStock.push(`Stock insuffisant pour ${productData.title}`);
          return null; // Si stock insuffisant, ignorer ce produit
        }

        // Mise à jour du stock
        updateBatch.update(productRef, { quantity: newQuantity });
        totalAmount += item.price * item.quantity; // Ajout du prix au total

        // Retour des détails du produit pour la commande
        return {
          title: productData.title,
          Product: productData.Product,
          category: productData.category,
          price: item.price,
          condition: productData.condition,
          description: productData.description,
          id: item.id,
          quantity: item.quantity,
        };
      });
    });

    // Attente de la récupération de tous les produits
    const productsDetails = await Promise.all(productDetails);

    // Vérification de la disponibilité des produits
    if (insufficientStock.length > 0) {
      return res.status(400).json({
        message: 'Certains produits ont un stock insuffisant.',
        details: insufficientStock,
      });
    }

    // Création des données de la commande
    const orderData = {
      userId,
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      phoneNumber: formData.phoneNumber,
      deliveryMethod: formData.deliveryMethod,
      products: productsDetails.filter(Boolean), // Filtrer les produits valides
      totalAmount: totalAmount.toFixed(2), // Total formaté
      orderDate: new Date().toISOString(), // Date de la commande
    };

    // Ajout de la commande dans la collection 'commandes'
    const orderRef = await addDoc(collection(firestore, 'commandes'), orderData);

    // Envoi des modifications du lot de mise à jour
    await updateBatch.commit();
    await setDoc(cartRef, { products: [] }); // Vidage du panier après confirmation

    // Configuration de l'email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Vérification de la connexion au service email
    await transporter.verify();

    // Création du corps du mail pour le client
    const productsClient = productsDetails.map(item => {
      return `Produit: ${item.title}\nType de produit: ${item.Product}\nCatégorie: ${item.category}\nPrix: ${item.price} DT\nQuantité: ${item.quantity}\nMode de livraison: ${formData.deliveryMethod}\n\n`;
    }).join('');

    // Paramètres du mail pour le client
    const mailOptionsClient = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Confirmation de votre commande',
      text: `Bonjour ${formData.fullName},\n\nVotre commande a été confirmée.\n\nInformations Produits:\n\n${productsClient}\n\nTotal de la commande: ${totalAmount.toFixed(2)} DT`,
    };

    // Création du corps du mail pour l'administrateur
    const productsAdmin = productsDetails.map(item => {
      return `Produit: ${item.title}\nType de produit: ${item.Product}\nCatégorie: ${item.category}\nPrix: ${item.price} DT\nQuantité: ${item.quantity}\n\n`;
    }).join('');

    // Paramètres du mail pour l'administrateur
    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'wajdiammar010@gmail.com',
      subject: 'Nouvelle commande',
      text: `Nouvelle commande par ${formData.fullName}.\n\nInformations client:\nNom complet: ${formData.fullName}\nEmail: ${formData.email}\nAdresse: ${formData.address}\nVille: ${formData.city}\nCode postal: ${formData.postalCode}\nTéléphone: ${formData.phoneNumber}\nDate de la commande: ${new Date().toLocaleString()}\nMode de livraison: ${formData.deliveryMethod}\n\nProduits:\n\n${productsAdmin}\n\nTotal de la commande: ${totalAmount.toFixed(2)} DT`,
    };

    // Envoi des emails au client et à l'administrateur
    await transporter.sendMail(mailOptionsClient);
    await transporter.sendMail(mailOptionsAdmin);

    // Réponse à la requête avec succès
    res.status(200).json({ message: 'Commande confirmée, emails envoyés.', orderId: orderRef.id });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
};

module.exports = { confirmation };
