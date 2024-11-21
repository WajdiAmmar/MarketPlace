const { firestore } = require('../config/firebase');
const nodemailer = require('nodemailer');

const confirmation = async (req, res) => {
  try {
    const { formData, userId } = req.body;

    // Vérification des données de commande
    if (!formData || !formData.email || !formData.fullName || !userId) {
      return res.status(400).json({ message: 'Données de commande ou utilisateur manquantes.' });
    }

    console.log("Données de la commande:", formData);

    // Récupération du panier depuis Firestore pour l'utilisateur
    const cartRef = firestore.collection('cart').doc(userId);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      return res.status(404).json({ message: 'Panier non trouvé pour cet utilisateur.' });
    }

    const cartData = cartDoc.data();
    const productsInCart = cartData.products || [];

    if (productsInCart.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide.' });
    }

    // Mettre à jour les quantités des produits dans Firestore
    const batch = firestore.batch();

    for (const item of productsInCart) {
      const productRef = firestore.collection('products').doc(item.productId);
      const productDoc = await productRef.get();

      if (!productDoc.exists) {
        console.error(`Produit non trouvé pour l'ID: ${item.productId}`);
        continue;
      }

      const productData = productDoc.data();
      const newQuantity = productData.quantity - item.quantity;

      if (newQuantity < 0) {
        return res.status(400).json({ 
          message: `La quantité demandée pour le produit ${productData.title} dépasse le stock disponible.` 
        });
      }

      batch.update(productRef, { quantity: newQuantity });
    }

    // Exécuter les mises à jour
    await batch.commit();

    // Vider le panier de l'utilisateur
    await cartRef.set({ products: [] });

    // Envoi d'emails de confirmation au client et à l'administrateur
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    const mailOptionsClient = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Confirmation de votre commande',
      text: `Bonjour ${formData.fullName},\n\nVotre commande a été confirmée avec succès.\nDétails: ${JSON.stringify(productsInCart, null, 2)}`,
    };

    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'wajdiammar010@gmail.com',
      subject: 'Nouvelle commande reçue',
      text: `Une nouvelle commande a été passée par ${formData.fullName}.\nDétails: ${JSON.stringify(productsInCart, null, 2)}`,
    };

    await transporter.sendMail(mailOptionsClient);
    await transporter.sendMail(mailOptionsAdmin);

    res.status(200).json({ message: 'Commande confirmée, emails envoyés, produits mis à jour et panier vidé.' });
  } catch (error) {
    console.error('Erreur lors de la confirmation de la commande:', error);
    res.status(500).json({ message: 'Erreur interne du serveur lors de la confirmation de la commande.' });
  }
};

module.exports = { confirmation };
