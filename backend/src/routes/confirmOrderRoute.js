const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/confirm-order', async (req, res) => {
  try {
    const { formData } = req.body;

    // Vérification des données de commande
    if (!formData || !formData.email || !formData.fullName) {
      console.log("Données manquantes:", formData);
      return res.status(400).json({ message: 'Données de commande incomplètes.' });
    }

    console.log("Utilisateur:", process.env.EMAIL_USER); // Vérification de la variable d'environnement
    console.log("Données de la commande:", formData); // Vérification des données de commande

    // Configuration du transporteur
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    // Tester la connexion
    await transporter.verify();

    // Définition des options d'email
    const mailOptionsClient = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Confirmation de votre commande',
      text: `Bonjour ${formData.fullName},\n\nVotre commande a été confirmée.\nDétails: ${JSON.stringify(formData, null, 2)}`
    };

    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'wajdiammar010@gmail.com',
      subject: 'Nouvelle commande',
      text: `Une nouvelle commande a été passée.\nDétails: ${JSON.stringify(formData, null, 2)}`
    };

    // Envoi de l'email au client et à l'administrateur
    await transporter.sendMail(mailOptionsClient);
    await transporter.sendMail(mailOptionsAdmin);

    res.status(200).json({ message: 'Commande confirmée et emails envoyés.' });
  } catch (error) {
    console.error('Erreur lors de la confirmation de la commande:', error);
    res.status(500).json({ message: 'Erreur interne du serveur lors de la confirmation de la commande.' });
  }
});

module.exports = router;
