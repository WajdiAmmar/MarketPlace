import React from 'react';

const PaymentForm = ({ formData, onPrevious, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
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
          type="text"
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
      </div>
    </div>
  );
};

export default PaymentForm;
