import React from 'react';

const PersonalInfoForm = ({ formData, onNext, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value); // Update the form data in CheckoutForm
  };

  return (
    <div className="form-container">
      <h2>Informations personnelles</h2>
      <label>Nom complet</label>
      <input
        type="text"
        name="fullName"
        placeholder="Entrez votre nom complet"
        value={formData.fullName}
        onChange={handleChange}
      />

      <label>Numéro de téléphone</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <select>
          <option value="+216">Tunisie (+216)</option>
        </select>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Numéro de téléphone"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <label>Adresse e-mail</label>
      <input
        type="email"
        name="email"
        placeholder="Entrez votre adresse e-mail"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Adresse</label>
      <input
        type="text"
        name="address"
        placeholder="Rue, numéro, etc."
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="Ville"
        value={formData.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Code postal"
        value={formData.postalCode}
        onChange={handleChange}
      />

      <button onClick={onNext}>Suivant</button>
    </div>
  );
};

export default PersonalInfoForm;
