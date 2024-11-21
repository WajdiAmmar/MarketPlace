const { doc, getDoc, setDoc, writeBatch } = require('firebase/firestore');
const { firestore } = require('../config/firebase');
const nodemailer = require('nodemailer');

const confirmation = async (req, res) => {
  try {
    const { formData, userId } = req.body;

    if (!formData || !formData.email || !formData.fullName || !userId) {
      return res.status(400).json({ message: 'Données de commande ou utilisateur manquantes.' });
    }

    const cartRef = doc(firestore, 'Panier', userId);
    const cartDoc = await getDoc(cartRef);

    if (!cartDoc.exists()) {
      return res.status(404).json({ message: 'Panier introuvable.' });
    }

    const cartData = cartDoc.data();
    const productsInCart = Array.isArray(cartData.products) ? cartData.products : [];

    if (productsInCart.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide.' });
    }

    const updateBatch = writeBatch(firestore);
    const insufficientStock = [];
    let totalAmount = 0; // Initialisation du total

    for (const item of productsInCart) {
      const productRef = doc(firestore, 'products', item.id);
      const productDoc = await getDoc(productRef);

      if (!productDoc.exists()) {
        insufficientStock.push(`Produit non trouvé pour l'ID ${item.id}`);
        continue;
      }

      const productData = productDoc.data();
      const newQuantity = productData.quantity - item.quantity;

      if (newQuantity < 0) {
        insufficientStock.push(`Stock insuffisant pour ${productData.title}`);
        continue;
      }

      updateBatch.update(productRef, { quantity: newQuantity });

      // Ajout du montant total pour chaque produit
      totalAmount += item.price * item.quantity;
    }

    if (insufficientStock.length > 0) {
      return res.status(400).json({
        message: 'Certains produits ont un stock insuffisant.',
        details: insufficientStock,
      });
    }

    await updateBatch.commit();
    await setDoc(cartRef, { products: [] });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    // Préparer le contenu des emails avec le total
    const productsClient = productsInCart.map(item => {
      return `Produit: ${item.title}\nType de produit: ${item.Product}\nCatégorie: ${item.category}\nPrix: ${item.price} DT\nQuantité: ${item.quantity}\nMode de livraison: ${formData.deliveryMethod}\n\n`;
    }).join('');

    const mailOptionsClient = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Confirmation de votre commande',
      text: `Bonjour ${formData.fullName},\n\nVotre commande a été confirmée.\n\nInformations Produits:\n\n${productsClient}\n\nTotal de la commande: ${totalAmount.toFixed(2)} DT`,
    };

    const productsAdmin = productsInCart.map(item => {
      return `Produit: ${item.title}\nType de produit: ${item.Product}\nCatégorie: ${item.category}\nPrix: ${item.price} DT\nQuantité: ${item.quantity}\n\n`;
    }).join('');

    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'wajdiammar010@gmail.com',
      subject: 'Nouvelle commande',
      text: `Nouvelle commande par ${formData.fullName}.\n\nInformations client:\nNom complet: ${formData.fullName}\nEmail: ${formData.email}\nAdresse: ${formData.address}\nVille: ${formData.city}\nCode postal: ${formData.postalCode}\nTéléphone: ${formData.phoneNumber}\nDate de la commande: ${new Date().toLocaleString()}\nMode de livraison: ${formData.deliveryMethod}\n\nProduits:\n\n${productsAdmin}\n\nTotal de la commande: ${totalAmount.toFixed(2)} DT`,
    };

    await transporter.sendMail(mailOptionsClient);
    await transporter.sendMail(mailOptionsAdmin);

    res.status(200).json({ message: 'Commande confirmée, emails envoyés.' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
};

module.exports = { confirmation };
