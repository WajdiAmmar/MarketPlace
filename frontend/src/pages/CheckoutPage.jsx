import React, { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm'; // Importation du composant CheckoutForm

const CheckoutPage = () => {
  // État pour gérer l'affichage du formulaire de paiement
  const [showCheckout, setShowCheckout] = useState(true); 

  // Fonction pour masquer le formulaire de paiement
  const handleCloseCheckout = () => setShowCheckout(false);

  return (
    <div>
      {/* Affiche le formulaire de paiement si showCheckout est vrai */}
      {showCheckout && (
        <CheckoutForm 
          show={showCheckout} // Passe l'état au composant enfant
          handleClose={handleCloseCheckout} // Passe la fonction pour fermer le formulaire
        />
      )}
    </div>
  );
};

export default CheckoutPage; // Export du composant pour utilisation ailleurs
