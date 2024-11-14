const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/confirm-order', (req, res) => {
  const { formData } = req.body;  // Récupérer les données de commande envoyées par le frontend

  // Configurer le transporteur de mail (Nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  // Configuration de l'email pour le client
  const mailOptionsClient = {
    from: process.env.EMAIL_USER,
    to: formData.email,
    subject: 'Confirmation de votre commande',
    text: `Bonjour ${formData.fullName},\n\nVotre commande a été confirmée.\nDétails: ${JSON.stringify(formData)}`
  };

  // Configuration de l'email pour l'administrateur
  const mailOptionsAdmin = {
    from: process.env.EMAIL_USER,
    to: 'admin@example.com', // Remplacez par l'email de l'administrateur
    subject: 'Nouvelle commande',
    text: `Une nouvelle commande a été passée.\nDétails: ${JSON.stringify(formData)}`
  };

  // Envoyer les emails
  transporter.sendMail(mailOptionsClient, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email au client.' });
    }
    transporter.sendMail(mailOptionsAdmin, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email à l\'administrateur.' });
      }
      res.status(200).json({ message: 'Commande confirmée et emails envoyés.' });
    });
  });
});

module.exports = router;
