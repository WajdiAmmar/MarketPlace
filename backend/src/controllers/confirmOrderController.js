const { doc, getDoc, setDoc, writeBatch, collection, addDoc } = require('firebase/firestore');
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

    const productDetails = productsInCart.map(item => {
      const productRef = doc(firestore, 'products', item.id);
      return getDoc(productRef).then(productDoc => {
        if (!productDoc.exists()) {
          insufficientStock.push(`Produit non trouvé pour l'ID ${item.id}`);
          return null; // Ignore this product
        }

        const productData = productDoc.data();
        const newQuantity = productData.quantity - item.quantity;

        if (newQuantity < 0) {
          insufficientStock.push(`Stock insuffisant pour ${productData.title}`);
          return null; // Ignore this product
        }

        updateBatch.update(productRef, { quantity: newQuantity });
        totalAmount += item.price * item.quantity;

        // Return only necessary product details
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

    const productsDetails = await Promise.all(productDetails);

    if (insufficientStock.length > 0) {
      return res.status(400).json({
        message: 'Certains produits ont un stock insuffisant.',
        details: insufficientStock,
      });
    }

    // Add order to 'commandes' collection
    const orderData = {
      userId,
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      phoneNumber: formData.phoneNumber,
      deliveryMethod: formData.deliveryMethod,
      products: productsDetails.filter(Boolean), // Filter out null products
      totalAmount: totalAmount.toFixed(2),
      orderDate: new Date().toISOString(), // Add order date
    };

    // Create a new document for this order in the 'commandes' collection
    const orderRef = await addDoc(collection(firestore, 'commandes'), orderData);

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

    const productsClient = productsDetails.map(item => {
      return `Produit: ${item.title}\nType de produit: ${item.Product}\nCatégorie: ${item.category}\nPrix: ${item.price} DT\nQuantité: ${item.quantity}\nMode de livraison: ${formData.deliveryMethod}\n\n`;
    }).join('');

    const mailOptionsClient = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Confirmation de votre commande',
      text: `Bonjour ${formData.fullName},\n\nVotre commande a été confirmée.\n\nInformations Produits:\n\n${productsClient}\n\nTotal de la commande: ${totalAmount.toFixed(2)} DT`,
    };

    const productsAdmin = productsDetails.map(item => {
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

    res.status(200).json({ message: 'Commande confirmée, emails envoyés.', orderId: orderRef.id });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
};

module.exports = { confirmation };
