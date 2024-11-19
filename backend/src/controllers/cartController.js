const { doc, getDoc, updateDoc, setDoc, deleteField } = require('firebase/firestore');
const { firestore } = require('../config/firebase');

// Ajouter un produit au panier
const addToCart = async (req, res) => {

  try {
    const { userId , product } = req.body;

    if (!userId || !product) {
      return res.status(400).json({ message: 'UserId et produit sont requis.' });
    }

    const cartRef = doc(firestore, 'Panier', userId);
    const cartSnapshot = await getDoc(cartRef);

    if (cartSnapshot.exists()) {
      const cartData = cartSnapshot.data();
      const products = Array.isArray(cartData.products) ? cartData.products : [];

      const existingProduct = products.find((p) => p.id === product.id);

      if (!existingProduct) {
        await updateDoc(cartRef, {
          products: [...products, { ...product, quantity: 1 }],
        });
      } else {
        return res.status(400).json({ message: 'Le produit est déjà dans le panier.' });
      }
    } else {
      await setDoc(cartRef, {
        userId,
        products: [{ ...product, quantity: 1 }],
      });
    }

    res.status(200).json({ success: true, message: 'Produit ajouté au panier avec succès.' });
  } catch (error) {
    console.error(`Error adding product to cart for userId: ${userId}`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};


// Récupérer les produits du panier
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'UserId est requis.' });
    }

    const cartRef = doc(firestore, 'Panier', userId);
    const cartSnapshot = await getDoc(cartRef);

    if (!cartSnapshot.exists()) {
      return res.status(404).json({ message: 'Panier introuvable.' });
    }

    const cartData = cartSnapshot.data();
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    console.error(`Error retrieving cart for userId: ${userId}`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer un produit du panier
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'UserId et productId sont requis.' });
    }

    const cartRef = doc(firestore, 'Panier', userId);
    const cartSnapshot = await getDoc(cartRef);

    if (cartSnapshot.exists()) {
      const cartData = cartSnapshot.data();
      const updatedProducts = cartData.products.filter((p) => p.id !== productId);

      await updateDoc(cartRef, {
        products: updatedProducts.length ? updatedProducts : deleteField(),
      });

      res.status(200).json({ success: true, message: 'Produit supprimé du panier avec succès.' });
    } else {
      res.status(404).json({ message: 'Panier introuvable.' });
    }
  } catch (error) {
    console.error(`Error removing product from cart for userId: ${userId}`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, change } = req.body;

    if (!userId || !productId || typeof change !== 'number') {
      return res.status(400).json({ message: 'UserId, productId, et changement sont requis.' });
    }

    const cartRef = doc(firestore, 'Panier', userId);
    const cartSnapshot = await getDoc(cartRef);

    if (cartSnapshot.exists()) {
      const cartData = cartSnapshot.data();
      const products = Array.isArray(cartData.products) ? cartData.products : [];
      const productIndex = products.findIndex((p) => p.id === productId);

      if (productIndex === -1) {
        return res.status(404).json({ message: 'Produit non trouvé dans le panier.' });
      }

      // Mettre à jour la quantité
      products[productIndex].quantity += change;

      // Supprimer le produit si la quantité devient 0
      if (products[productIndex].quantity <= 0) {
        products.splice(productIndex, 1);
      }

      await updateDoc(cartRef, { products });

      res.status(200).json({ success: true, message: 'Quantité mise à jour avec succès.', products });
    } else {
      res.status(404).json({ message: 'Panier introuvable.' });
    }
  } catch (error) {
    console.error(`Error updating quantity for userId: ${userId}`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
module.exports = { addToCart, getCart, removeFromCart,updateQuantity};
