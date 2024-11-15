import React, { useState } from 'react';

const PersonalInfoForm = ({ formData, onNext, onChange }) => {
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Vérification du nom complet
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis.';
      isValid = false;
    }else if (formData.fullName.length < 7) {
      newErrors.fullName = 'Le nom complet doit contenir au moins 7 caractères.';
      isValid = false;
    }

    // Vérification du numéro de téléphone (simple validation pour un numéro tunisien)
    const phonePattern = /^(\+216)?\d{8}$/;
    if (!formData.phoneNumber.trim() || !phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Le numéro de téléphone est invalide. Assurez-vous qu\'il soit au format correct.';
      isValid = false;
    }

    // Vérification de l'email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email)) {
      newErrors.email = 'L\'adresse e-mail n\'est pas valide.';
      isValid = false;
    }

    // Vérification de l'adresse
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise.';
      isValid = false;
    }

    // Vérification de la ville
    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise.';
      isValid = false;
    }

    // Vérification du code postal
    const postalCodePattern = /^[0-9]{4,5}$/; // Code postal tunisiens généralement à 4 chiffres
    if (!formData.postalCode.trim() || !postalCodePattern.test(formData.postalCode)) {
      newErrors.postalCode = 'Le code postal est invalide. Il doit être à 4 ou 5 chiffres.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
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
      {errors.fullName && <p className="error-message">{errors.fullName}</p>}

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
      {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

      <label>Adresse e-mail</label>
      <input
        type="email"
        name="email"
        placeholder="Entrez votre adresse e-mail"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error-message">{errors.email}</p>}

      <label>Adresse</label>
      <input
        type="text"
        name="address"
        placeholder="Rue, numéro, etc."
        value={formData.address}
        onChange={handleChange}
      />
      {errors.address && <p className="error-message">{errors.address}</p>}

      <label>Ville</label>
      <input
        type="text"
        name="city"
        placeholder="Ville"
        value={formData.city}
        onChange={handleChange}
      />
      {errors.city && <p className="error-message">{errors.city}</p>}

      <label>Code postal</label>
      <input
        type="text"
        name="postalCode"
        placeholder="Code postal"
        value={formData.postalCode}
        onChange={handleChange}
      />
      {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}

      <button onClick={handleSubmit}>Suivant</button>
    </div>
  );
};

export default PersonalInfoForm;
