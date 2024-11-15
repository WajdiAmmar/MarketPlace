import React from 'react';

const PaymentForm = ({ formData, onPrevious, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
 // Fonction pour confirmer la commande et envoyer les données au backend
 const handleConfirmOrder = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/confirm-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    alert(data.message); // Afficher un message de confirmation
  } catch (error) {
    console.error('Erreur lors de la confirmation de la commande:', error);
    alert('Une erreur est survenue lors de la confirmation de votre commande.');
  }
};

  return (
    <div className="form-container">
      <h2>Informations de paiement</h2>
      <label>Nom du titulaire de la carte</label>
      <input
        type="text"
        name="cardName"
        placeholder="Nom du titulaire"
        value={formData.cardName}
        onChange={handleChange}
      />

      <label>Numéro de la carte</label>
      <input
        type="text"
        name="cardNumber"
        placeholder="Numéro de la carte"
        value={formData.cardNumber}
        onChange={handleChange}
      />

      <label>Date d'expiration</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="date"
          name="expirationDate"
          placeholder="MM/AA"
          value={formData.expirationDate}
          onChange={handleChange}
        />
      </div>

      <label>Code CVV</label>
      <input
        type="password"
        name="cvv"
        placeholder="CVV"
        value={formData.cvv}
        onChange={handleChange}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onPrevious}>Précédent</button>
        <button onClick={handleConfirmOrder} variant="success">Confirmer la commande</button>
      </div>
    </div>
  );
};

export default PaymentForm;
